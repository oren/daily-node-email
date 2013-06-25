
Today we will write a proxy server. a proxy is a piece of code that stand in the middle of the request and can do something with the request before passing it along. a good use case for a proxy is if you have a big legacy site written in an old technology and you want to switch to a new shiny tech but doing it incrementally instead of a 'big bang' approach.
Our proxy will not be smart at all. it will accept HTTP requests and forward them to google.com. it will make sure to pass the query string, the header and the method (post/get etc) of the original request and just pass it to google.
Copy paste this code and run it with node proxy.js and go to localhost:3000/search?q=hello

```js
// proxy.js

'use strict';

var http = require('http');

http.createServer(function(req, res) {
  var options = {
    hostname: 'www.google.com',
    port: 80,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  var clientReq = http.request(options, function(newRes) {
    console.log('STATUS: ' + newRes.statusCode);
    res.writeHead(newRes.statusCode, newRes.headers);
    newRes.pipe(res);
  });

  req.pipe(clientReq);

}).listen(3000);

console.log('Proxy server Listening - http://localhost:4000');
```

We need to understand streams so we can figure out what's going on here. The 'trick' in node is to connect streams to each other:   
1. Every request that comes to our proxy is slowly (chunk after chunk) being directed to the request for google.com. that's what req.pipe(clientReq) is doing. 
2. When clientReq receives chunks it start to sends chunks to the HTTP request for getting google.com, and the response from google is being directed to the response of our original request.

This 'magic' is done because we are dealing with streams. and a stream in node have .pipe function. Some streams in node are readable streams - a stream that you can read from (using the pipe function) and some streams are writable streams(you can write into them). 
The piping is done from a read stream to a write stream. In our case req is a read stream and clientReq is a write stream, so req.pipe(clientReq) is possible. Also newRes is a read stream and res is a write stream so newRes.pipe(res) is possible as well.
I am sure it's confusing but after you get the idea of streaming stuff together, it slowly make more sense.

One more thing, there are great packages in NPM that gives a robust solution for a proxy. maybe we'll look into them tomorrow?
