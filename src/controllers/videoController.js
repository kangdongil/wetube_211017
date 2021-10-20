export const recommended = (req, res) => {
	const videos = [
		{
			title: "First Video",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1
		},
		{
			title: "Second Video",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1
		},
		{
			title: "Third Video",
			rating: 5,
			comments: 2,
			createdAt: "2 minutes ago",
			views: 59,
			id: 1
		},
	]
	res.render("home", {pageTitle: "Home", videos});
}
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");