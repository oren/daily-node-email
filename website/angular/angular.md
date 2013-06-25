On Friday we built a single page website with node and jade.
Today we are going to let a business owner find his business by providing a simple form - 

We will use AngularJS to show the text 'scanning...' at the buttom of the form as soon as the user hit the scan botton. We will also add an NPM package that serve static files.


Here is server code from Friday (we also had a simple jade file)
```js
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

First let's add the html form in index.jade:

```jade
!!! 5
html(ng-app='presence')
  head
    title Presence Manager
  body
    h1 Manage your online presence
    h3 Update your business listings on 100 sites, apps and maps

    h2 Scan Your Business
    .scan-form(ng-controller='Scan')
      label(for='name') Name: 
      input(ng-model='name', name='name')
      br
      br
      label(for='phone') Phone: 
      input(ng-model='phone', name='phone')
      p
        button(ng-click="scan()") Scan
      p(ng-show='scanning') Scanning...

    script(src='https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js')
    script(src='public/js/app.js')
    script(src='public/js/controllers/scan.js')
```

Notice that I already added everything we need for Angular - np-app at the top, ng-controller for the interaction with the user and 3 script tags.
Run the server and make sure you can see it. Nothing happens when you hit that button since we don't have the JS files let's add them.

First, create a new folder - public. That's how you define your app in Angular:
```js
// public/js/app.js

'use strict';

angular.module('presence', [])
```

Our controller - simple function with scan() function that will set the scanning variable to true:
```js
// public/js/scan.js

'use strict';

function Scan($scope) {
  $scope.scanning = false;  // hide the 'Scanning...' when the app loads

  $scope.scan = function () {
    $scope.scanning = true;  // show the 'Scanning...'
  };
}
```

Try to restart the server and refesh the browser. You'll see JavaScript errors. The problem is the browser is trying to reach for the JavaScript files but it doesn't know where to find them.  
We need to tell our server that when the browser asks for files inside the public folder, we will serve them, if they exist.
We can do it 'by hand' by using the fs.readFile() or other built-in file-system function or use an existing npm package that serves static files. Let's install one of those.
`npm install st`.  st was written by Isaacs, the creator of NPM and the Node.js project leader (another popular package is ecstatic).

Change your server.js to look like that:

```js
// core module
var http = require('http');

// npm package
var Templar = require('templar');
var jade = require('jade');
var st = require('st')

var mount = st({ path: __dirname + '/public', url: '/public' })
Templar.loadFolder('./templates');

http.createServer(function(req, res) {
  var stHandled = mount(req, res);
  if (stHandled) { return; }

    res.template = Templar(req, res, { engine: jade, folder: './templates' });
    res.template('index.jade', { title: 'Presence Website', data: {} });
}).listen(3000);

console.log('Server Listening - http://localhost:3000');
```

We told st what folder to serve and on each request we call mount.  mount will return true if it handles the static request.

Run our site with `node server.js` and click the Scan button. The 'Scanning...' should appear since we have `$scope.scanning = true;` in our controller.  
That's it. We added AngularJS and a way to serve static files.
