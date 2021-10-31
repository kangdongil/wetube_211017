import User from "../models/User";

export const getJoin = (req, res) => {
	return res.render("join", {pageTitle: "Join"});
};
export const postJoin = async (req, res) => {
	const { name, username, email, password, password2, location } = req.body;
	const pageTitle = "Join";
	const errMsg = []
	if(password !== password2) {
		errMsg.push("Password confirmation does not match.");
	}
	const usernameExists = await User.exists({ username });
	if (usernameExists) {
		errMsg.push("This username is already taken.");
	}
	const emailExists = await User.exists({ email });
	if (emailExists) {
		errMsg.push("This email is already taken.");
	}
	if (errMsg.length > 0) {
		res.status(400).render("join", {pageTitle, errMsg});
		return errMsg.length = 0;
	}
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
	}

	
}
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User Profile");