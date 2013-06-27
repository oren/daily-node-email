# NPM

TLDR

npm, node package manager, is your friend. Get to know him.

***

Unlike Ruby, Node.js doesn't come with a lot of built-in libraries. The node developers realized that most of the innovation will come from the community so there is no point in writing a lot of core libraries. [The Node documentation](http://nodejs.org/api/) can be read in one (lifeless) weekend.
And the community is indeed exploding - There are already 33,493 packages, stored as 50 GB of CouchDB documents.

Small core is not enough to explain the massive growth of the Node eco-system. Another factor is the package manager node is using - npm.
Think of rubygems + bundler but awesome. Also, It's embarrassingly easy to publish an npm package and the community encourages building small packages that are focused on doing one small task.

Here are a few commands and tips that will help you get started.

### Install an npm package

`npm install browserify`

The install command will get the package (browserify in this example) from github and put it's content inside your current directory, in a folder called node_modules.

`npm install browserify --save`

The same as above and also add the package name and version to your package.json file (see below).

### Update version of installed packages

`npm update` for updating all the installed packages of a project 

`npm update express` - update a specific package (express, in this example)

### Show installed packages

`npm ls`

### Show Readme page of a package

`npm docs express`

### Create package.json

`npm init`

This file is similar to Gemfile in Ruby with additional meta-data. Here is an example:

```bash
{
  "name": "yp",
  "version": "0.0.1",
  "scripts": {
    "start": "make start"
  },
  "dependencies": {
    "express": "3.2.6",
    "jade": "~0.31.2",
    "express-useragent": "0.0.7-1",
  },
  "devDependencies": {
    "nodeunit": "~0.8.0",
    "istanbul": "~0.1.37"
  }
}
```

### Find packages

`npm search mysql`

Search the npm registry for packages matching the search terms. Example output:

```bash
NAME                  DESCRIPTION                                                   AUTHOR                DATE              VERSION     KEYWORDS
Accessor_MySQL        A MySQL database wrapper, provide easy access to database without writing SQL code =bu 2012-11-28 11:34  0.4.1       mysql accessor genericobject observer
any-db                Database-agnostic connection pooling, querying, and result sets =grncdr             2013-06-14 00:19  0.6.0       mysql postgres pg sqlite sqlite3
autodafe              mvc framework for node with mysql orm, web sockets support, logging, routing, user roles etc =jifeon 2012-10-19 21:26  0.5.0       mvc framework mysql orm websockets
backbone-mysql        A sync module for Backbone.js and Node.js for use with MySQL  =ccowan               2013-03-04 18:01  0.2.0
```

### Share your package

`npm publish`

Publish your package to the npm registry so others will be able to `npm install your-sweet-package`

### Configuration

`npm config ls -l` - show all available configs.

`npm config set viewer browser` - will open your browser instead of bash for viewing help

You can also set everything manually in ~/.npmrc

### Enable tab-completion in all npm commands

`npm completion` 

This command will spit some output that you can add to .bashrc.  direct the output to a tmp file and copy to .bashrc - `npm completion > tmp`

### Get Help

`npm help`

`npm help install` - specific help page for (npm install in this example)

***

One last thing. There is no clear vocabulary in regards to what is a **module** and what is an **npm package**. A common convention is that module is a file in the format of a CommonJS module that your project is using (for example, Node.js built-in like 'http' or your own file) and a module will become an npm package if it's published to npm.