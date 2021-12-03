import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
	const videos = await Video.find({}).sort({createdAt: "desc"}).populate("owner");
	return res.render("home", {pageTitle: "Home", videos})
};
export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id).populate("owner");
	if (!video) {
		return res.status(404).render("404", {pageTitle: "Video not found."});
	}
	return res.status(404).render("videos/watch", {pageTitle: video.title, video});
};
export const getEdit = async (req, res) => {
	const { id } = req.params;
	const { user: { _id } } = req.session;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", {pageTitle: "Video not found."});
	}
	if (String(video.owner) !== _id) {
		return res.status(403).redirect("/");
	}
	res.render("videos/edit", {pageTitle: `Edit: ${video.title}`, video });
	
};
export const postEdit = async (req, res) => {
	const { id } = req.params;
	const { user: { _id } } = req.session;
	const { title, description, hashtags } = req.body;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", {pageTitle: "Video not found."});
	}
	if (String(video.owner) !== _id) {
		return res.status(403).redirect("/");
	}
	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags),
	});
	return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
	res.render("videos/upload", {pageTitle: "Upload Video"});
};
export const postUpload = async (req, res) => {
	const { user: { _id } } = req.session;
	const { title, description, hashtags } = req.body;
	const { path: fileUrl } = req.file;
	try {
		const newVideo = await Video.create({
			title,
			description,
			fileUrl,
			owner: _id,
			hashtags: Video.formatHashtags(hashtags),
		});
		const user = await User.findById(_id);
		user.videos.push(newVideo._id);
		user.save();
	} catch(err) {
		console.log(err);
		return res.status(400).render("videos/upload", { pageTitle: "Upload Video", errMsg: err._message, });
	}
	return res.redirect("/");
};
export const deleteVideo = async (req, res) => {
	const { id } = req.params;
	const { user: { _id } } = req.session;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", {pageTitle: "Video not found."});
	}
	if (String(video.owner) !== _id) {
		return res.status(403).redirect("/");
	}
	await Video.findByIdAndDelete(id);
	return res.redirect("/");
};

export const search = async (req, res) => {
	const { keyword } = req.query;
	let videos = [];
	if (keyword) {
		videos = await Video.find({
			title: {
				$regex: new RegExp(`^${keyword}`, "i"),
			},
		}).populate("owner");
	}
	return res.render("search", {pageTitle: "Search Video", videos });
};