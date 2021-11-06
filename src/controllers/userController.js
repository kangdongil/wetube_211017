import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
	return res.render("join", {pageTitle: "Join"});
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
		res.status(400).render("join", {pageTitle: "Join", errMsg});
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
		return res.status(400).render("join", {
			pageTitle: "Join",
			errMsg: error._message,
		});
	};
};
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const getLogin = (req, res) => res.render("login", {
	pageTitle: "Login"
});
export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
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
			res.status(400).render("login", {pageTitle: "Login", errMsg});
			return errMsg.length = 0;
		};
	};
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User Profile");