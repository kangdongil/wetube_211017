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
  * package.json: mange project of nodeJS
    - "main": assign main file of the package
	- "scripts": help run code easily
	  - `npm run [SCRIPT_NAME]`
	- "dependencies": sub-packages required to run
	- "devDependencies": dependencies that developer needs
	  - add `--save-dev` in `npm i`
  * .json: way of programmer invented to save information in file

# 2.3 Babel
  - JavaScript Compiler that convert lastest code into stable one
  - Install `@babel/core`
  	- `npm install --save-dev @babel/core`
  - Create `babel.config.json`
  	- `touch babel.config.json`(console)
	  ```
    {
	   "presets": ["@babel/preset-env"]
	}
	  ```
	- `npm install --save-dev @babel/preset-env`
	
  

# Express
  ```
  const express = require("express");
  const app = express();
  ```