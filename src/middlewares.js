export const localsMiddleware = (req, res, next) => {
	res.locals.siteName="Wetube";
	res.locals.loggedIn = req.session.loggedIn;
	next();
};