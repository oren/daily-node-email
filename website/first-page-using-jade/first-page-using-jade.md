Today we'll start creating our first website. It will be a single page app that renders html on the server (first request) and from that point it spits json back to the browser. We will use Jade as a server-side template engine and AngularJS on the client.
Today we will focus on a basic HTTP server that serves HTML with the help of Jade. It should take us about 15 seconds to do all that. Set your timers and go!
Copy paste the following files:

```js
//server.js

// core module
var http = require('http');

// npm package
var Templar = require('templar');
var jade = require('jade');

Templar.loadFolder('./templates');

http.createServer(function(req, res) {
  res.template = Templar(req, res, { engine: jade, folder: './templates' });
  res.template('index.jade', { title: 'Presence Website', data: {} });
}).listen(3000);

console.log('Server Listening - http://localhost:3000');
```

Create a folder for the template files called templates, and add index.jade:

```js
//templates/index.jade

!!! 5
html
  head
    title Presence Manager
    meta(content='Presence', name='description')
    meta(content='text/html; charset=UTF-8', http-equiv='Content-Type')
    meta(charset='utf-8')
    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1', name='viewport')
  body
    h1 Manage your online presence
    h3 Update your business listings on 100 sites, apps and maps
```

Install the following packages: npm install jade and npm install templar
That's it. Run it with node server.js and open your browser.
You just built your first website using node and jade.
Notice that we used the templar package to render jade into html on the server. The way we did it was first to add a key(res.template) to the response object.
This key holds a function that we can use whenever we want to render an html.
Also, templar is nice enough to support other templates (like ejs) so it's easy to switch to a different one.
Next week we will add a few more components to our website. Things like serving static files (css/js/images) and using AngularJS for organizing our client side code.
