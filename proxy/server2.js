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
    res.writeHead(newRes.statusCode, newRes.headers);
    newRes.on('data', function (chunk) {
      console.log('response data', chunk);
      res.write(chunk); 
    });
  });

  clientReq.end();

  req.on('data', function (chunk) {
    console.log('request data', chunk);
    clientReq.write(chunk); 
  });

}).listen(4000);

console.log('Proxy server Listening - http://localhost:4000');
