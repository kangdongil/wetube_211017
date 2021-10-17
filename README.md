# 1.1 Software Requirements
  - NodeJS(`node -v`)
  - 
  
# 1.3 NodeJS란,
  - JavaScript runtime build-on Chrome
  - JavaScript run outside of the browser

# 1.4 NPM이란,
  - a package manager for the JavaScript programming language
  - NPM allows us to download nodeJS package
  
# 2.0 NodeJS 프로젝트 시작하기
  1. Create Project Folder
  2. Create package.json
    - `npm init`
  3. Initialize Git
  	- `git init`
	- `git remote add origin [GITHUB_REPOSITORYLINK]`
	- Create `.gitignore`
	  - /node_modules
  4. install packages
    - `npm install [PACKAGE_NAME]` || `npm i [PACKAGE_NAME]`
	- `npm i`: install dependencies automatically
  5. Create /src folder
    - put all the code inside in `/src`
	- make sure script's file path is correct
	
  * package.json: mange project of nodeJS
    - "main": assign main file of the package
	- "scripts": help run code easily
	  - `npm run [SCRIPT_NAME]`
	- "dependencies": sub-packages required to run
	- "devDependencies": dependencies that developer needs
	  - add `--save-dev` in `npm i`
  * .json: way of programmer invented to save information in file

# 2.3 Babel & Nodemon 알아보기
  - Babel: JavaScript Compiler that convert lastest code into stable one
  - Nodemon: Watch file changes then restart automatically
  - Babel Installation
  	1. Install `@babel/core`
	 	- `npm install --save-dev @babel/core`
    2. Create `babel.config.json`
		- `touch babel.config.json`(console)
		```
		{
		 "presets": ["@babel/preset-env"]
		}
		```
    3. Install `@babel/preset-env`
		- `npm install --save-dev @babel/preset-env`
  - Nodemon Installation
  	1. Install `@babel/node`
		- `npm i --save-dev @babel/core @babel/node`
	2. Install `nodemon`
		- `npm i --save-dev nodemon`
	3. set script to execute `babel-node`
		- `"dev": "babel-node index.js"`
    4. set script to execute `nodemon`
		- `"dev": "nodemon --exec babel-node index.js`

# Express로 Server 시작하기
  - import express and create express application
    - old JavaScript way:
	    ```
		const express = require("express");
		const app = express();
		```
	- latest JavaScript way:
		```
		import express from "express";
		const app = express();
		```
  - console.log when server listen to request
    - set constant PORT
	  - PORT = "4000";
	- when PORT was listened, run callback function
	  - app.listen(PORT, [CALLBACK_FUNC]);

# 3.1 HTTP 방식으로 Request과 Response하기
  - HTTP Method: the way communcation happens between user(request) and server(response)
  - When request happened, executed function is assigned two arguments: req, res
  - Request: the user 'requests' page from the server
    - GET Request
	  - `app.get("[ROUTE]", [FUNCTIONS]);`
	- req object has many methods that provides information:
	  - `req.url`
	    : what url are being requested
	
  - Response: the server 'responses' and display it to the user
    - there are many ways to respond
    - when 'return' response, it will end the request
	- res's methods:
      - res.end();
	    : finish connection instantly
	  - res.send("[MESSAGE]");
	    : send text and short amount of HTML
	  - res.render();
	  - res.redirect();

# 4.0 Middleware 알아보기
  - middleware: software that execute in the middle of request and response
  - handler = middleware = controller
  - every controller can be middleware
  - controller has three arguments: req, res, next
    - by using `next();`, it will call the next function
    - run controllers in order by seperating with comma(,)
	  - `app.get("/", [MIDDLEWARE], [FINALWARE])`
  - if controller should be used globally, use `app.use`
  	- `app.use([CONTROLLER]);`
  - controllers happen top to bottom, so carefully with the order
  
  