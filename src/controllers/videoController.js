import Video from "../models/Video";

export const home = async (req, res) => {
	const videos = await Video.find({});
	return res.render("home", {pageTitle: "Home", videos})
};
export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	return res.render("watch", {pageTitle: video.title, video});
};
export const getEdit = (req, res) => {
	const { id } = req.params;
	res.render("edit", {pageTitle: `Edit `});
};
export const postEdit = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	return res.redirect(`/videos/${id}`);
};
export const deleteVideo = (req, res) => res.send("Delete Video");
export const search = (req, res) => res.send("Search Video");
export const getUpload = (req, res) => {
	res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = async (req, res) => {
	const { title, description, hashtags } = req.body;
	try {
		await Video.create({
			title,
			description,
			hashtags: hashtags.split(",").map((word) => `#${word}`),
		});
	} catch(err) {
		return res.render("upload", { pageTitle: "Upload Video", errMsg: err._message, });
	}
	return res.redirect("/");
};