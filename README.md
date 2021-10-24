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
  	- req object has many methods that provides information:
	  - `req.url` `req.path`
	    : what url are being requested
	  - `req.method`
	    : which method is being selected
	  - `req.params`
	    : return list of parameters
	  - `req.body`(required configuration)
	    : return form's value as javascript object
    - GET Request
	  : send information to url explicitly
	  - `app.get("[ROUTE]", [CONTROLLER]);`
	- POST Request
	  : POST used when send file or change state of DataBase
	  - `app.post("[ROUTE]", [CONTROLLER]);`
	- Same URL on several requests
	  - `app.route("[ROUTE]").get([CONT]).post([CONT])`
	  - when same functionality, name controller,
	    such as, "getEdit", "postEdit"
  - Response: the server 'responses' and display it through browser
    - there are many ways to respond
    - To end request, 'return' the response
	- response is not about `return`, but calling the function
	- when response repeated, error occured.
      (cannot set header after sent to client)
	- to prevent this, make sure 'return' it
	- after 'return' response, after code will be invalid
	- res's methods:
      - res.end();
	    : finish connection instantly
	  - res.send("[MESSAGE]");
	    : send text and short amount of HTML
	  - res.render();
	  - res.redirect();
	    : move on to specific URL

# 3.5 Express Middleware 알아보기
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
  - you can do both `export` and `export default`
    - to import, `import [NICKNAME], { VAR } from "[PATH]";`

# 4.7 URL parameter 이용해 URL 표현하기
  - absolute URL & relative URL
    : add / in front, url will start from root(absolute)
	: without / in front, url will start from current path(relative)
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
	- JavaScript Regular Expression
	  : way to extract information from string
	  - \\w
	    : match with any word character
	  - \\d
	    : match with any digit(one number)
      - \\d+
	    : any number(regardless of size)
	- to use regular expression on url path, `[PATH]([REGEXP])`
	- if you use MongoDB, RegExp should be `hexadecimal 24 numbers`
	  - `[PATH]([0-9a-f]{24})`
	- make sure `try / catch ` error to 404 page, if page doesn't exist(when hexadecimal 24 number is valid)
	  - ```
	  if (!instance) {
	    //404 render
	  }
	  // successful render
	  ```

# 5.1 Pug를 이용해 HTML Rendering하기
  - template: premade HTML content in purpose of integrity of website
  - rendering: convert HTML,CSS,JavaScript code into graphic figure
  - Pug: template engine which help create views by tab-spacing instead of taging(`<~>`)
  - Installation
    - `npm i pug`
	- set pug as view engine
	  - `app.set("view engine", "pug");` in server.js
	- create `views` folder
	  - `mkdir /src/views`
	- set path for views folder
	  - `app.set("views", process.cwd() + "/src/views");`
	  - default path was `process.cwd() + "/views"`
	  - cwd(current_working_directory) is directory that node starts
	- delete 'express' record from the header
	  - `app.disable('x-powered-by');`
  - How to create view as .pug
	- create `.pug` file in `view` folder
	- render `view` from controller
	  `res.render("[VIEW_FILE]")`
  - Pug Syntax
    - write tag without `<>`
	- pug configure block scope with indentation(just like python)
	  - because pug is senitive to indent, no need to end block scope
	- write attribute as inside the parenthesis
    - `doctype html` << `<!DOCTYPE html>` 
	- `tag ~` << `<tag> ~ </tag>`
    - to use javascript code as variable in pug, `#{~}`

# 5.2 Reusable HTML 블록 사용하기(partial & base & mixin)
  - partial
    : reusable fixed html block
  	- Initial Setup
	  - create `partial` folder
	  : `mkdir src/views/partials/`
	- write partial
	- use partial
	  - include partial inside of pug file
	  : `include partials/[PARTIAL_NAME]`
  - base
    : duplicate(inherit) the structure of HTML
	- `extends [BASE]`
	- `block [NAME]`
	- if extends, you can fill content inside of blocks
	- block is a window that input customize stuff
  - mixins
  	: partials that receive data
	- Initial Setup
	  - create `mixins` folder
	  : `mkdir src/views/mixins`
	- write mixin
	  - starts with `mixin [MIXIN_NAME]([PARAM])`
	  - indent first and use [PARAM] to describe structure of mixin
	- use mixin
	  - include mixin inside of pug file
	  : `include mixins/[MIXIN_NAME]`
	  - with iteration, use item as data for mixin
	  : `+[MIXIN]([ITEM])`
  - send variable to template
    - from controller side, render variables after view name
	  - `res.render("[VIEW_NAME]", {[VAR_NAME]: "[VALUE]", ..})`
	- variable can be text, object
	- if the value is only variable, equal(=) it
	  - `[TAG_NAME]=[VAR]`
	- if text is mixed state with variable, use `#{[VAR]}`
	- when variable have to be use in attribute, use backtick then `${VAR}`

# 5.7 조건(Conditional)과 분기(Iteration) Pug으로 표현하기
  - conditionals
  : determine which code should run depend on conditions
    - `if [CONDITION]`
	- `else`
	- `else if [CONDITION]`
  - iteration
  : execute code on every element on array
    - `each [ITEM] in [ITEMS]`
	- if list of items is null, use `else`
	
# 6.0 Data를 Back-end로 보내는 원리 이해하기
  - Preparation `<form>` for sending data to backend
    - create `<form>`
	- insert `<input>`
	- give attribute 'name' to `<input>`(important!)
	- `<input type="submit">` to send request
  - `<form>`'s attribute related to backend
    - method: way transmit information between form and back-end
	  - method default is "GET"
	  - to send data to backend, method should be "POST"
	    : `method="POST"`
	- action: determine which url send data
  - how to get information from POST request
    - allow express application to convert form's value to javascript object
	  - `app.use(express.urlencoded({ extended: true }));`
	- make sure the position of configuration is in front of routers
	- get POST request's data
	  - `req.body`

# 6.11 `init.js`로 기능 세분화하기
  - `server.js` deals with express-stuff, configuration of server
  - `init.js` deals with initialization of server, db and import stuff(such as model)
  - preparation
    - touch `src/init.js`
	- `export default app;` from server.js
	- `import app from "./server";`
    - move `app.listen` and stuff(`PORT`, `CALLBACK`) from `server.js` to `init.js`
	- change `package.json`'s script `dev` to start from `init.js`
	  - `"dev": "nodemon --exec babel-node src/init.js"`
	
# 6.7 MongoDB 준비하기
  - mongoDB: JSON-like document-based database
    - [LINK](https://docs.mongodb.com/manual/)
	- Initialize MongoDb in console
	  - `mongod` >> `mongo`
  - mongoose: bridge to help interact mongoDB and javascript
    - Installation
	  - `npm i mongoose`
  - Connect DB to server
    - create db.js in src folder
	- import mongoose
	  - `import mongoose from "mongoose";`
	- connect mongodb through mongoose
	  - `mongoose.connect("mongodb://127.0.0.1:27017/wetube");`
	- create mongoDB event-handler in console
  	  - DB Connection
	    `mongoose.connection.once("open", [CALLBACK])`
	  - DB Error
	    `mongoose.connection.on("error", [CALLBACK](error))`
	- import `db.js` into `init.js`
	  - `import "./db";`
  
  * mongoDB shell command
    - `show dbs`
	  : show list of DBs
	- `use [DB]`
	  : switch DataBase
	- `db`
	  : show current DB name
	- `show collections`
	  : show collections of current DB
	- `db.[COLLECTIONS].find()`
	  : show instances detail in mongoDB
	- `db.[COLL].remove({})`
	  : remove every instances from collection
  * collection: group of instances

# 6.9 MongoDB Model & Schema & Document 알아보기
  - ToDoList for DB Configuration
    - view list of videos
    - create videos
    - view video detail
    - edit video
    - delete video
  - Create Model
    - mkdir src/models
    - touch [Model].js(capitalized-case)
    - import mongoose
      - `import mongoose from "mongoose";`
    - define the shape of model(=Schema)
      - `const videoSchema = new mongoose.Schema({~});`
	  - `{~}`: `{[ENTRY]: [DATATYPE], ~}`
    - There are two ways to describe [DATATYPE],
      - `{ type: [Datatype] }`
	  - or just `[Datatype]`
	- datatype help validate to type wrong information
    - define model and `export default` it
      - `const [Model] = mongoose.model("[Name]", [SCHEMA]);`
	  - `export default [Model];`
  - add more `options` to schema(=validation)
    - when `type` represent as curly bracket(`{}`), you can add more options to define which kind of data is valid specifically
	- such as, `required: true` or `default: ~` is commonly used
  - Import Model into `init.js`
    - `import "./models/Video";`
	- order of code is important, import "./db" first
	
  * model: constructor from Schema definition(allow CRUD operation to schema)
  * schema: define shape of the model
  * Schema Types & related options
    - Any Types
      - `required: [BOOLEAN]`
	  - `default: Any or [Function]`
	  - when javascript code as default, don't execute it `()`
	- String
	  - `lowercase / uppercase: [BOOLEAN]`
	  - `trim: [BOOLEAN]`
	  - minLength / maxLength
	  - make sure length-limit is applied on front-end, too.
	- Number


# 6.13 Mongoose Query 알아보기
  - import model to controller
  - Mongoose models provide method for CRUD operation(=mongoose query):
  - import the model to controller and use it
  	- `import [Model] from "../model/[Model]"`
  - there are two way to execute `mongoose query`
    1. pass in callback function
	   - `[Model].[QUERY]([SEARCH_TERM], [CALLBACK])`
	   - search term: `{}`
	   - callback have two signatures(attributes), "err" and "docs"
	   - make sure `render` is inside of callback (to prevent render precede getting result from db)
	   - you can catch error by `if error exist` statement
	2. use as promise as `.then()`
	   - `await` the mongoose query(make sure controller is `async`)
	   - use `try / catch` statement to catch error
	   - when error message needed, `catch(error)`
  - by `static`, you can create customize function
    - `[Schema].static("[STATIC_NAME]", [FUNCTION](input))`
	- use as `[Model].[STATIC_NAME](input)`

  * mongoose query
    - [Model].exists({[PROPERTY]});
    - [Model].find({});
	- [Model].findById([ID]);
	- [Model].create({[OBJECT]});
	- [Model].findByIdAndUpdate([ID], {[OBJECT]});
  * `{}` means everything


# 6.16 MongoDB에 Data를 Create하기
  - get data from `POST request` to `req.body`
    - VIEW
	  - `<input name="~" ~>`
	- ROUTE
	  - `[ROUTER].route("~").post([CONT])`
	- CONTROLLER
	  - `const { ~ } = req.body`
  - There are two ways to upload instance into DB:
  1. Create JavaScript Object & Updating using `save()`
	 - create `instance` with `model`
	   - ```
	    const [INSTANCE] = new [Model]({
	    [ENTRY]: [VALUE],
	    })
	   ```
     - when [VALUE] is invalid for [DATATYPE], it will be ignore
	 - `_id` value will be given when instance created
	 - send JavaScript object(=instance) to DataBase
	   - `video.save()`(make sure `async` & `await`)
     - display DB instance to HTML
       - search instance from DB
	   - `const` `Video.find({})` `(async & await)`
	 - render the instance
  2. Updating using `[Model].create`
     - Example:
	 ```await [Model].create({
        [ENTRY]: [VALUE],
        })
     ```
     - you can also catch error with `try / catch` statement
	 - catch has `err` signature, which can be used as `err._message` to paint as HTML string

  * document: instance of model(doc is like record in SQL)

# 6.22 MongoDB에 Data를 Update하기
  - `getEdit` should check if instance exist because it has `:id` parameter
    - check instance exist only
	  - `const [Instance]Exists = await Video.exists({ _id: id });`
	  - `if (![Instance]Exists ) { [404] };
	- when instance is need for next process
	  - `const [Instance] = await Video.findById([ID]);`
	  - `if (![Instance]) { [404] }`
  - get data from `POST request` to `req.body`
    - VIEW
	  - `<input name="~" ~>`
	- ROUTE
	  - `[ROUTER].route("~").post([CONT])`
	- CONTROLLER
	  - `const { ~ } = req.body`
  - There are two ways to update data,
  1. import object and change data manually
     - make sure [Model].save();
  2. use `[Model].findByIdAndUpdate()`
     - first, find `id` of updating video
	 - second, write updated object
	 
# 6.23 Mongoose Middleware 알아보기
  - Middleware: can intercept event to modify document
  - middleware should be located between schema and model
  - in middleware, to indicate document is `this` argument
  - pre("save")
    - `[Schema].pre("save", async function {
	~
	})`

# 6.25 MongoDB에 Data를 Delete하기
  - `Delete link` inside of template
  - `Route` and `Controller`
  - `findByIdAndDelete()`

# 5.6 CSS
  - makeshift: `MVP.CSS`
  	- `<link rel="stylesheet" href="https://unpkg.com/mvp.css">`
	