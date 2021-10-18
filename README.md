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
	
  * package.json: manage project of nodeJS
    - "main": assign main file of the package
	- "scripts": help run code easily
	  - `npm run [SCRIPT_NAME]`
	- "dependencies": sub-packages required to run
	- "devDependencies": dependencies that developer needs
	  - add `--save-dev` in `npm i`
  * .json: way of programmer invented to save information in file
  * /node_modules: the folder which stored installed packages files
    - make sure .gitignore `/node_modules`

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

# 3.0 Express로 Server 시작하기
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
	  
	* server: computer that turn on 24 hours online and listening to request

# 3.1 HTTP 방식으로 Request과 Response하기
  - HTTP Method: the way communcation happens between user(request) and server(response)
  - When request happened, executed function is assigned two arguments: req, res
  - Request: the browser 'requests' page from the server
    - GET Request
	  - `app.get("[ROUTE]", [FUNCTIONS]);`
	- req object has many methods that provides information:
	  - `req.url`
	    : what url are being requested
	  - `req.method`
	    : which method is being selected
	  - `req.path`
	  - `req.params`
	    : return list of parameters
  - Response: the server 'responses' and display it through browser
    - there are many ways to respond
    - To end request, 'return' the response
	- after 'return' response, after code will be invalid
	- res's methods:
      - res.end();
	    : finish connection instantly
	  - res.send("[MESSAGE]");
	    : send text and short amount of HTML
	  - res.render();
	  - res.redirect();

# 3.5 Middleware 알아보기
  - middleware: software that execute in the middle of request and response
  - handler = middleware = controller
  - every controller can be middleware
  - controller has three default arguments: req, res, next
    - by using `next();`, it will call the next function
  - to run controllers in order, seperate them with comma(,)
    - `app.get("/", [MIDDLEWARE], [FINALWARE])`
  - if controller should be used globally, use `app.use`
  	- `app.use([CONTROLLER]);`
  - `app.use` is useful when specific middleware is being used globally
  - controllers happen top to bottom, so carefully with the order

# 3.11 Useful External Middleware Example:
  - Morgan: request logger middleware
    - Installation
      - `npm i morgan`
	- Usage
	  - `import morgan from "morgan";`
	    : import morgan
	  - `const logger = morgan("dev");`
	    : configure morgan
	  - `app.use(logger)`
	    : morgan as middleware
		
# 4.0 Router로 URL 관리하기
  - router: organize controllers and urls in easier way
  - router is like a 'mini-application' which provide structure for developer
  - router group URLs in same category
  - by using router, you can omit the common part of url
  - How to create Router:
    1. initialize Router
	   - `const [ROUTER_NAME] = express.Router();`
	2. add URL on Router
	   - `[ROUTER].get("[URL]", [CONTROLLER]);`
	3. create Controller for URL
	   - `const [CONTROLLER_NAME] = (req, res) => res.~();`

  - Modulize Router by way of folders and files
  	- seperate routers and controllers in folder and files
	- routers
	   - create structure(console)
	      ```
		  mkdir src/routers
		  cd src/routers
		  touch [NAME]Router.js
		  ```
	   - import express for each router files
	     `import express from "express";`
	   - move code which declare router and url
	     `const [ROUTER_NAME] = express.Router();`
		 `[ROUTER].get("[PATH]", [CONTROLLER_NAME]);`
	   - export router(variable) by `export default`
	     `export default [VAR_ROUTER];`
	   - import router to `server.js`
	     `import [ROUTER_NAME] from "[ROUTER_FILE_PATH]";`
	- controllers
	  - create structure(console)
	      ```
		  mkdir src/controllers
		  cd src/controllers
		  touch [NAME]Controller.js
		  ```
	   - import express for each router files
	     `import express from "express";`
	   - export each controller(variable)
	     `export const [CONTROLLER_NAME] = (req, res) => ~;`
	   - import each controller to each router
	     `import {CONT, CONT, ...} from "[ROUTER_FILE_PATH]";`
	   - make sure controller's name is exact from import one
	- there is no need for `global controller`, because controller are related to specific domain(funtionality)

# 4.1 Router 구상하기(Wetube 예제)
  1. What kind of data you are going to mainly handle?(what's your project's domain?)
     - video
	 - user
  2. what urls you need based on data(domain)?
     - / (home) (global router)
	   - /join
	   - /login
	   - /search
	 - /users (user router)
	   - /see-user-profile >> /users/:id
	   - /logout-user >> /users/logout
	   - /edit-user >> /users/edit
	   - /delete-user >> /users/delete
	 - /videos (video router)
	   - /watch-video >> /videos/watch >> /videos/:id
	   - /upload-video >> /videos/upload
	   - /edit-video >> /videos/edit >> /videos/:id/edit
	   - /delete-video >> /videos/delete >> /videos/:id/delete

  3. Exceptionally, some url adjoin to 'global router' to access more easily
  
# 4.5 import & export & export default 알아보기
  - every nodeJS files has seperate environment
  	- import packages in each required file is necessary
  - to import variable from other files, you need to export it first
  - when export, it's important to specify what variable you're going to export
  - there are two ways to export:
    - export default
	  - export main 'only' variable as default
	  - `export default [VARIABLE]`
	  - import [NICKNAME] from "[PATH]";
	  - if nodeJS package, instead of PATH, you can use PACKAGE_NAME
	- export
	  - can export several variables
	  - prefix `export` in front of variables
	    `export const [VARIABLE]`
	  - import {VAR, VAR, ...} from "[PATH]"; 
	  - when import, variable name should be exact as export one

# 4.7 URL parameter
  - URL parameter: allow url to include variable by starting with colon(`:`)
    - ex. `:id`
	- `:[PARAMS_NAME]`
  - how to read parameter from url:
    - `req.params.[PARAMS_NAME]`
  - When you GET request url contains parameter first than other url, other url will be interrupted because of parameter unless it has conditional(because javascript run top to bottom)
    - ex.
	  ```
	  [ROUTER].get("/:id", ~); << id will intercept value "home"
	  [ROUTER].get("/home", ~);
	  ```
    - make sure parameter-contained url located in bottom to prevent interception
  - to restrict parameter data type, there are two ways:
    - built-in Express Route
	  - `a+`
	    : many a available
	  - `a*b`
	    : any characters is valid between a and b
	  - `a(bc)?d`
	    : bc can be omit
	- Regular Expression
	  : way to extract information from string
	  - \\w
	    : match with any word character
	  - \\d
	    : match with any digit(one number)
      - \\d+
	    : any number(regardless of size)
	- to use regular expression on url path, `[PATH](\\[REGEXP])`