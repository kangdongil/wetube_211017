import express from "express";

export const recommended = (req, res) => res.send("Home");
export const watch = (req, res) => res.send("Watch Video");
export const edit = (req, res) => res.send("Edit Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");