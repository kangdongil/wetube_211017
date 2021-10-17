import express from "express";

const PORT = 4000;

const app = express();

const handleLogin = (req, res) => {
	return res.send("Login Here.");
}

const handleHome = (req, res) => {
	return res.send("<h1>I still love you.</h1>");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port: https://wetube--roivh.run.goorm.io/`)

app.listen(PORT, handleListening);