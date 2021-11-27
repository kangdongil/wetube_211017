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
	  - `req.query`
	    : return list of query(information after `?`)
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
  - Status Code: Browser will refer to status-code to check connection is valid or not
    - valid status-code is `200`
	- by assigning adequate status-code, browser can determine which connection is valid or not
    - How to modify status-code:
	  - `res.status([CODE]).~`
	- Status-code Example:
	  - `200`: OK
	  - `400`: Bad Request
	  - `404`: Not Found

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
  - send variable to template globally
    - `res.locals` is being automatically import by pug template
	- add data to object by `res.locals.[ENTITY] = [VALUE]`
	- to use locals object `#{[ENTITY]}` or just [ENTITY] as condition

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
  - always make sure, `mongod` turned on, so you can access to DataBase
  
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
	- schema help validate to type wrong information
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
	  - `unique: [BOOLEAN]`
	  - when javascript code as default, don't execute it `()`
	- String
	  - `lowercase / uppercase: [BOOLEAN]`
	  - `trim: [BOOLEAN]`
	  - minLength / maxLength
	  - make sure length-limit is applied on front-end, too.
	- Number
	- Boolean


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
    - [Model].exists({[PROPERTY]: "[VALUE]"});
    - [Model].find({});
	  - `.sort({[PROPERTY]: asc / desc })`
	- [Model.findOne({ ~ });
	- [Model].findById([ID]);
	- [Model].create({[OBJECT]});
	- [Model].findByIdAndUpdate([ID], {[OBJECT]});
  * mongoose query operator
    - $or operator
      - `$or: [{CONDITION}, ...]`
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
    - `[Schema].pre("save", async function { ~ })`

# 6.25 MongoDB에 Data를 Delete하기
  - `Delete link` inside of template
  - `Route` and `Controller`
  - `findByIdAndDelete()`

# 6.26 MongoDB에 Data를 Search하기
  - Build up `Search` functionality
    - search `Route` from globalRouter
	- search `Controller`
	  - get data from `req.query`
	  - render .pug
	- search `template(.pug)`
	  - extends base
	  - <form method="GET"><input name="keyword">
  - Configure `Search`
    - `let` empty array
	  - `let [VARNAME] = []`
	- if keyword exists
	  - `if (keyword) { ~ }`
	- `Video.find([CONDITION])` and save it to array
	- render array and use it
  - Use `$regex`(Regular Expression) from MongoDB
    - `$regex: new RegExp(`^${keyword}`, "i")`
	- `"i"` means `case-insensitive`
	- `^` in front means starts-with
	- `$` at back means ends-with
	  
# 7.0 User 계정 Create(C)하기
  - create User Model
    - username / password / confirm password / ~
  - Router(get,post)
  - Template
    - nav / form:schema / errMsg
	- link:`/login`
	  - `Already have an account? Log in Now &rarr;`
  - Controller: postJoin(C)
	- `[Model].create`
	- `res.redirect` to `/login`
  - Password Hashing
    - Encrypt password with hash function
	- raw password in DB is vulnerable from hacker
	- install `node.bcrypt.js`
	  - `npm i bcrypt`
	- how to use bcrypt
	  - `import bcrypt from "bcrypt";`
	  - `bcrypt.hash([plainText], [saltRounds]);`
	- hash password with bcrypt
	  - `pre("save")` userSchema
	  - `await bcrypt.hash([plainText], [saltRounds]);`
	- compare passwords between plain and hashed
	  - `bcrypt.compare([plainText], [hash]);`
  - Form Validation
    - when validation failed, send bad request(status-code)
	  - `res.status(400).~`
    - prevent duplication
	  - `{ unique : true }` from schema(DB)
	  - use `try / catch` statement if username already existed
	  - errMsg: `This username is already taken.`
	- confirm password
	  - if `password !== password2(confirm)`
	  - errMsg: `Password confirmation does not match.`

  * hash-function
    - same input always same output
  * saltRounds: how many times the text is being hashed

# 7.5 User 계정 Login하기
  - Router(get,post)
  - Template
    - nav / form:schema
	- link:`/join`
	  - `Don't have an account? Create one Now &rarr;`
  - Controller: postLogin
    - check if account exists
	  - get data from POST request(`req.body`)
	  - errMsg: `An account with this username does not exists.`
	- check if password correct
	  - `bcrypt.compare` between plainText and hashedText
	  - errMsg: `Wrong password`
	- `// initialize login session`
	- `res.redirect` to `/`
  - Initialize Login Session
    - add login data to `req.session`
	  - `req.session.loggedIn`
	  : whether log in or not
	  - `req,session.user`
	  : user data
	  - use session data on template by `res.locals`
	    - `if loggedIn`
		- `res.locals.loggedIn = Boolean(req.session.loggedIn) || {};`

# 7.7 Session과 Cookies 알아보기
  - Session: memory about activities between server and browser
    - to make session happens, server and browser should have information about session(`session_id`)
  - Cookies: where server put data in browser to remember about user
    - properties of cookie
      - secret: string to sign on the session cookie
      - domain: where cookie comes from, cokkie is limited by domain
      - expires: when cookie will expires
      - maxAge: how long the cookie is valid(mili-second)
    - cookie only save session ID, session data is stored in server
  - how Session works:
    - HTTP connection is stateless which means each request is independent so that server can't remember the user
	- so when browser first-visited Website, server(express) will give an `session_id` about the user
	- browser save `session_id` into cookies
	- when browser request to backend(ex. revisit website), browser attach that `session_id` to the server to identify who is the user
	- when server validate the user, server will give appropriate response about the user
  - how to access data about session:
    - session from browser(session_id in cookie)
  	  - [chrome inspector] - [application] - [cookies] - connect.sid
    - sessions from backend(session_objects)
  	  - `req.sessionStore.all((session))`
    - session from request
  	  - check cookies value from `req.headers`
	  - `req.session.id`

# 7.9 middlewares.js 세분화하기
  - touch `middlewares.js`
  - configure middleware and make sure end with `next();`
  - export const `middleware`
  - import middleware.js
    - `import { [MIDDLEWARE] } from "./middlewares";`
  - use imported middleware
    - `app.use([MIDDLEWARE]);`
  
  * localsMiddleware
    - `locals.sitename`
	- `locals.loggedIn`

# 7.10 Express로 Session 구현하기
  - install & import `express-session`
    - `npm i express-session`
    - `import session from "express-session";`
  - create session
    - session as middleware `app.use`(before router)
      - secret
      - resave / saveUninitialized: true
  - add properties about session(initialize session)(postLogin)
    - `req.session.[ENTITY] = [VALUE]`
	- `.loggedIn`(boolean), `.user`(instance)
  - use session's data from template(pug)
    - pug automatically has access to `locals` object
	- add content to locals object
	  - `res.locals.[ENTITY] = [VALUE]`
    - use locals object in pug template
	  - `#{[ENTITY]}` or just `[ENTITY]` if condition

  * `req.session`
    - every user has different `req.session` object
	  - because every user has different id

# 7.12 MongoDB에 Session 저장하기
  - SessionStore: storage where server save sessions
  - Why session should be saved on DB
    - server-side session storage is running on memory and it could be easily leak.
  - configure MongoStore
    - `npm i connect-mongo`
	- `import MongoStore from "connect-mongo";`
	- add store option in session middleware
	  - `store: MongoStore.create({mongoUrl: "[DB_URL]" })`
    - configuration successfully, `sessions` collection created
  - reconfigure session options
    - give session_id only to logined user
	  - resave / saveUninitialized : false
	- modify cookie properties
	  - add `cookie` in session middlware
	  : `cookie: {~}`

  * saveUninitialized: forces a session that is uninitialized
  * uninitialized: session that is new but not modified
    - if add data on `req.session`, then it's modified(initialized)

# 7.14 Environment File 설정하기
  - what Environment File does?
  	- environment file save string that should be hidden
  - dotenv: dotenv find variables in `.env` and put inside `process.env`
  - `.env` file: store string which needs to be hidden
  - Installation & Usage
    - `npm i dotenv`
    - touch & gitignore `/.env`
    - every key value should be named UPPERCASE
    - to use env, `process.env.[ENV]`

# 7.22 User 계정 Logout하기
  - Router
  - Template
    - nav(if loggedIn)
  - Controller
    - req.session.destroy();
	- `res.redirect` to `/`

# 7.16 OAuth로 GitHub 로그인 구현하기
  - Create github OAuth App
    - [Settings] - [Developer settings] - [OAuth Apps]
	  - create OAuth Apps
	  - get data needed in OAuth process
	  : `client_id` / `authorization callback URL` / `client_secret`
  - Flow of authorizing User with OAuth
    1. Redirect User to GitHub
	2. Users are redirected back to our site by GitHub
	3. App access the API with user's access token
  - How to redirect User to GitHub:
    - redirect to `https://github.com/login/oauth/authorize`
	- add parameters in url to specify what permission is needed
	- `github login` link on "login" template
	- create new route(router / controller)
	  - `/users/github/init`
	- const github_auth_url as baseUrl
	  - `https://github.com/login/oauth/authorize`
	- queries as object(name as config)
	  - client_id / scope(read:user, user:email)
	  - set `client_id` as env
	  - ```
	  const config = {
	    [QUERY]: [VALUE],
		...
	  }
	  ```
	- combine object's items into a string
	  - const queries = new URLSearchParams(config).toString();
	- complete url and redirect it
	  - const authUrl = `${baseUrl}?${queries};`
      - `res.redirect(authUrl);`
  - How to fetch Access Token from Code:
    - code: result from redirection as authorization
	- const new route(router / controller)
	  - `/users/github/callback`
	- combine object's items as URL
	  - baseUrl: `https://github.com/login/oauth/access_token`
	  - queries: client_id / client_secret / code
	  - set `client_id` and`client_secret` as env
	  - `code` from `req.query.code`
	  - queries object convert as string
	  - const `tokenUrl` for complete url
	- Enable `fetch` from nodeJS
	  - `npm install node-fetch@2.6.1`
	  - `import fetch from "node-fetch";`
	  - to use fetch, `await fetch([URL], [CONFIG])`
	- fetch Token as json from Code
	  - const tokenRequest
	  - [URL]: tokenUrl
	  - [CONFIG]
	  - `method: "POST"`
	  - `headers: {Accept: "application/json"}`
	  - await ([FETCH]).json();
  - How to get `User`&`Email` data with Access Token:
    - check if access token is valid
	  - `if ("access_token" in tokenRequest)`
      - if not, redirect to `/login`
	  // To-Do: error notification
    - get access token from json(tokenRequest)
	  - `const { access_token } = tokenRequest;`
	- const `apiUrl`
	  - `const apiUrl = "https://api.github.com"`
	- fetch User data from GitHub API
	  - const userData
	  - [URL]: `${apiUrl}/user`
	  - [CONFIG]
	  - headers: {Authorization: `token ${access_token}`}
	  - await ([FETCH]).json();
	- fetch Email data from GitHub API
	  - const emailData
	  - [URL]: `${apiUrl}/user/emails`
	  - [CONFIG]
	  - headers: {Authorization: `token ${access_token}`}
	  - await ([FETCH]).json();
	- filter and select(find) primary and verified email
	- redirect to `/login` if github email is not verified
	  - notification
	- if email is verified, `initialize session`(login) and redirect to `/`
  - Suggestions for Overlapping Problem of Login Methods
	- add new entity to UserSchema
	  - Boolean `noPasswordAccount`, default=false
    - Case 1: Local Login - locally joined, not github user
	  - when login with username and password,
	  `findOne` user that `noPasswordAccount` is false
	- Case 2: GitHub Login - locally joined, github user has same email as local
	  - find user that has same github user's email
	  - just initialize session
	- Case 3: GitHub Login - never locally joined
	  - if `!user`, create User instance using GitHub data
	  - `userData.~`, `emailData[verified].~`
	  - noPasswordAccount: true, password: ""
  
  * OAuth URL Parameters
    - `client_id` (from OAuth App)
	  - identify github what application is being logined
	- `client_secret`
	  - this generated from OAuth App
	- `allow_signup`
	  - when user don't have github account, allow sign up
	- `scope`
	: permit information you want to get about user
	  - when several scopes, delimit with whitespace
	  - `read:user`
	  - `user:email`

# 8.0 User Profile 수정(U)하기
  - Router(get, post)
  - Template
    - nav(if loggedIn)
	- form(name / email / username / location)
	- input's value as session(by locals variable)
  - Protect URLs with middlewares
    - create protector middlewares
	  - protectorMiddleware
	  : next() only logged-in user
	  : else redirect("/login")
	  - publicOnlyMiddleware
	  : next() only not logged-in user(public)
	  : else redirect("/")
	- add appropriate middleware in each route
	  - protectorMiddleware: logout / userEdit / userDelete / upload / videoEdit / videoDelete
	  - publicOnlyMiddleware: join / login / githubLogin
	  - `[Router].get([MIDDLEWARE], [CONT]);`
	  - `[Router].route([ROUTE]).all([MIDDLEWARE]).get~.post~`
  - Controller: postEdit
    - Update User data in DB
	  - `[Model].findByIdAndUpdate([ID], {[updateQuery]})`
	  - [ID]: req.sessions._id
	  - [updateQuery]: {username, email, name, location}
	- Update User data in sessions
	  - const result from findByIdAndUpdate as updatedUser
	  - add [optionQuery]: {new: true}
	  - req.session.user = updatedUser;
	- Form Validation(code-challenge)
	  - prevent overlapping unique value

# 8.4 Views 폴더 Structure 만들기
  - categorize `views/[CATEGORY]/[PUG]`
  - change `res.render`'s `template link` in controller
  - `extends ../base` for categorized pug files

# 8.5 Change Password 구현하기
  - Template
    - link(`change-password`) in "edit-profile"
	- form(old password / new password / new password confirmation) ; `type: password`
  - Router(get, post)
    - `.all(protectorMiddleware)`
  - Controller: postChangePassword
    - redirect to `/` when noPasswordAccount(session)
	- bring data from form and session
	  - form: oldPassword, newPassword, newPasswordConfirmation
	  - session: _id
	- find User with old Password
	  - const user = `await User.findById(_id)`
	  - await bcrypt.compare(oldPassword, user.password)
	- Form Validation
	  - if oldpassword is not correct
	  - if newpassword and its confirmation doesn't match
	- Replace password with new one and save();
	  - `user.password = newPassword`
	  - `await user.save();`
	  - if save(), password will be hashed due to pre.save()
	- redirect to `/logout`

# 8.6 Images 파일 올리기
  - Router(get, post)
    - protectorMiddleware
  - Template("edit-profile")
    - add avatar's label and input
		- label for === input id
		- input type="file", accept="image/*"
  - manage upload with `multer`
    - mkdir & gitignore `/uploads`
    - install Multer
      - `npm i multer`
	- change encode type of form
	  - `enctype="multipart/form-data` as form attrib
	- configurate multer as middleware
	  - `import multer from "multer";`
	  - const avatarUpload = `multer({ dest: "uploads/" });`
	- run middleware on Router before postController
	  - import `avatarUpload` middleware
	  - `~.post([MIDDLEWARE], [CONT]);`
	  - avatarUpload.single("INPUT's name")
  - save avatar image
    - const `req.file`
	- only change avatar when file is not undefined
	  - `avatarUrl: file ? file.path : avatarUrl `
  - show avatar in template
    - expose `/uploads` folder to browser(static file serving)
	  - `app.use("/uploads", express.static("uploads"));`
    - show it as img tag
	  - `img(src=~, width=100, height=100)`
	  - src: `loggedInUser.noPasswordAccount ? "" : "/"`

  * Reason why use avatar as url not file
	- DB contains only string, save file in harddrive
	- never upload file in DB, use save file path
  * multer: packages that manage files upload
    - get file from input
	- save file in `dest`
	- name file randomly(for uniqueness)
	- postEdit get file information from `req.file`
	- get fileUrl from `req.file.path`
  * multer options
    - dest
	- limits
	  - fileSize(bytes)

# 8.9 Video 파일 올리기
  - Middleware
    - configure multer
    - avatarUpload / videoUpload
  - Video Model
    - fileUrl
	  - type: string, required
  - Controller: postUpload
    - const video file name as fileUrl from `req.file`
	- add `fileUrl` in Video.create
  - Template("upload")
	- label for === input id
	- input type="file", accept="video/*"
  - Template("watch")
    - show it as video tag
	  - `video(src=video.fileUrl, controls)`

# 8.12 Model Relationship 알아보기
  - 
 
# 8.10 User Profile 만들기
  - Router(/:id([0-9a-f]{24})
  - Template
    - nav(My Profile)
  - Controller: see
    - const id from `req.params`
    - find User by Id
	  - `const user = await User.findById(id);`
	- if no user, render 404
	- send variables
	  - user object
	  - pageTitle: user.name
  - add owner into video
  - owner
    - model
	  - type: `mongoose.Schema.Types.ObjectId`
	  - ref: `"User"`
	- controller; postUpload
	  - owner: _id
	- controller: watch
	  - const owner = findById
	  - send variable owner
	- Template: "watch"
	  - owner name
	  - edit delete btn if owner
  - use ref
    - Video.findById(id).populate("owner")
	  - change user_id into whole user object
  - see videos related to user
    - const videos = await Video.find({ owner: user._id })
	- send variable videos
	- use mixins video
  - Mongoose Relationship
    - .populate([REL])
  - owner [VIDEOS]
  - hash bug
    - if (this.isModified("password"))
  - edit, delete form only for owner
  

# 5.6 CSS
  - makeshift: `MVP.CSS`
  	- `<link rel="stylesheet" href="https://unpkg.com/mvp.css">`
