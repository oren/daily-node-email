Ok, we got passing test and a module. Let's see how to publish it to NPM.  

*Note: the github repo for this package is https://github.com/oren/scrapy*

First let's organize our project:

```
scrapy/
├── Readme.md
├── index.js
├── package.json
├── .gitignore
└── test
    └── scrape.js
```

Notice three more files - Readme.md and pakcage.json and .gitignore.  
In .gitignore let's just have node_modules folder. that's where our dependencies live. We usualy don't want them in the repo.  
The package.json is similar to a Gemfile but also holds all kind of usful information about our module.
We can create it by hand or we can run `npm init`.

```json
{
  "name": "scrapy",
  "version": "0.0.1",
  "description": "Extract business name and phone from a YP business page",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": "",
  "author": "Oren",
  "license": "BSD",
  "readmeFilename": "Readme.md"
}
```

Let's add the two npm packages we need for this module:   
`npm install cheerio --save`  
--save will add it to package.json under 'dependencies'

`npm install tape --save-dev`  
--save-dev will add it to package.json under 'devDependencies'

Let's run our test to make sure it's still passing: `node test/scrape.js`  
Looks good. Here is a nice trick. I like to run `npm test` to run all my tests. To do that we are going to use a binary that comes with tape:
`node_modules/.bin/tape test/*.js`. Run this and watch your test pass again. Now add this command to package.json like this:

```
"scripts": {
    "test": "node_modules/.bin/tape test/*.js"
  },
```

sweet. let's run `npm test`. Now future tests in this folder will run as well.

We're almost there. Create a github repo, clone it, put our files inside and push it to github.  
Now run `npm publish`. If this is your first NPM package, you'll be prompt to do `npm adduser`. Just follow the instructions. it's just email/password that will be saved in your ~/.nmprc

Done. Now everyone can `npm install scrapy` and use our package.
Go ahead and try using it by copy paste the Example from the Readme into the node repl.

By the way, the Example in your Readme is the most important part of a good Readme. make sure it comes first, looks simple and easily understood. Everything else is secondary.


One last thing. There is no clear vocabulary in regards to what is a module and what is an NPM package. A common convention is that module is a file in the format of a CommonJS module that your project is using (for example, Node.js built-in like 'http' or your own file). A module will be called an NPM package as soon as it's published to NPM.