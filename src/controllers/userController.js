import User from "../models/User"
import Video from "../models/Video"
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
	return res.render("users/join", {pageTitle: "Join"});
};
export const postJoin = async (req, res) => {
	const { name, username, email, password, password2, location } = req.body;
	const pageTitle = "Join";
	const errMsg = []
	if(password !== password2) {
		errMsg.push("Password confirmation does not match.");
	};
	const usernameExists = await User.exists({ username });
	if (usernameExists) {
		errMsg.push("This username is already taken.");
	};
	const emailExists = await User.exists({ email });
	if (emailExists) {
		errMsg.push("This email is already taken.");
	};
	if (errMsg.length > 0) {
		res.status(400).render("users/join", {pageTitle: "Join", errMsg});
		return errMsg.length = 0;
	};
	try {
		await User.create({
			name,
			username,
			email,
			password,
			location,
		});
		return res.redirect("/login");
	} catch(err) {
		return res.status(400).render("users/join", {
			pageTitle: "Join",
			errMsg: error._message,
		});
	};
};
export const getEdit = (req, res) => {
	return res.render("users/edit-profile", { pageTitle: "Edit Profile"});
};
export const postEdit = async (req, res) => {
	const { _id, avatarUrl, email: sessionEmail, username: sessionUsername } = req.session.user;
	const { name, email, username, location } = req.body;
	const file = req.file;
	let searchParams = [];
	if (sessionEmail !== email) {
		searchParams.push({ email });
	};
	if (sessionUsername !== username) {
		searchParams.push({ username });
	};
	if (searchParams.length > 0) {
		const foundUser = await User.findOne({ $or: searchParams });
		if (foundUser && foundUser._id.toString() !== _id) {
			return res.status(400).render("users/edit-profile", { pageTitle: "Edit Profile", errMsg: "This username/email is already taken."});
		}
	}
	const updatedUser = await User.findByIdAndUpdate(_id, {
			avatarUrl: file ? file.path : avatarUrl,
			name,
			email,
			username,
			location
		},
		{ new: true }
	);
	req.session.user = updatedUser;
	return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
	return res.render("users/change-password", {pageTitle: "Change Password"});
};
export const postChangePassword = async (req, res) => {
	if (req.session.user.noPasswordAccount === true) {
		return res.status(400).redirect("/");
	};
	const { _id } = req.session.user;
	const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
	const user = await User.findById(_id);
	const pwdEquals = await bcrypt.compare(oldPassword, user.password);
	if (!pwdEquals) {
		return res.status(400).render("users/edit/password", {
			pageTitle: "Change Password",
			errMsg: "The current password is incorrect"
		});
	}
	if (newPassword !== newPasswordConfirmation) {
		return res.status(400).render("users/edit/password", {
			pageTitle: "Change Password",
			errMsg: "The password does not match the confirmation"
		});
	}
	user.password = newPassword;
	await user.save();
	// To-Do: send notification
	return res.redirect("/users/logout");
};
export const deleteUser = (req, res) => res.send("Delete User");
export const getLogin = (req, res) => res.render("users/login", {
	pageTitle: "Login"
});
export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username, noPasswordAccount: false });
	const errMsg = [];
	try {
		if (!user) {
			errMsg.push("An account with this username does not exist.");
			throw "can't find user";
		};
		const pwdEquals = await bcrypt.compare(password, user.password);
		if (!pwdEquals) {
			errMsg.push("Wrong password");
		};
	} finally {
		if (errMsg.length > 0) {
			res.status(400).render("users/login", {pageTitle: "Login", errMsg});
			return errMsg.length = 0;
		};
	};
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};
export const initGithubLogin = (req, res) => {
	const baseUrl = "https://github.com/login/oauth/authorize";
	const config = {
		client_id: process.env.GH_CLIENT,
		allow_signup: false,
		scope: "read:user user:email"
	};
	const params = new URLSearchParams(config).toString();
	const authUrl = `${baseUrl}?${params}`;
	return res.redirect(authUrl);
};

export const callbackGithubLogin = async (req, res) => {
	const baseUrl = "https://github.com/login/oauth/access_token"
	const config = {
		client_id: process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code
	}
	const params = new URLSearchParams(config).toString();
	const tokenUrl = `${baseUrl}?${params}`;
	const tokenRequest = await (
		await fetch(tokenUrl, {
			method: "POST",
			headers: {
				Accept: "application/json"
			}
		})
	).json();
	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const apiUrl = "https://api.github.com";
		const userData = await (
			await fetch(`${apiUrl}/user`, {
				headers: {
					Authorization: `token ${access_token}`
				}
			})
		).json();
		const emailData = await (
			await fetch(`${apiUrl}/user/emails`, {
				headers: {
					Authorization: `token ${access_token}`
				}
			})
		).json();
		const emailObj = emailData.find(
			(email) => email.primary === true && email.verified === true
		);
		if(!emailObj) {
			return res.redirect("/login");
			// To-Do: no verified github email
		}
		
		let user = await User.findOne({ email : emailObj.email });
		if (!user) {
			user = await User.create({
				avatarUrl: userData.avatar_url,
				name: userData.name ? userData.name : "",
				username: userData.login,
				email: emailObj.email,
				password: "",
				noPasswordAccount: true,
				location: userData.location,
			});
		}
		req.session.loggedIn = true;
		req.session.user = user;
		return res.redirect("/");
	} else {
		return res.redirect("/login");
		// To-Do: No verified Access-Token available
	}
};
export const logout = (req, res) => {
	req.session.destroy();
	return res.redirect("/");	
};
export const see = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).populate({
		path: "videos",
		populate: {
			path: "owner",
			model: "User",
		}
	});
	if (!user) {
		return res.status(404).render("404", { pageTitle: "User not found."});
	};
	return res.render("users/profile", {pageTitle: user.name ? user.name : user.username, user});
};