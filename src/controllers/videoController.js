import express from "express";

const fakeUser = {
	username: "Nicolas",
	loggedIn: true,
}

export const recommended = (req, res) => res.render("home", {pageTitle: "Home", fakeUser});
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");