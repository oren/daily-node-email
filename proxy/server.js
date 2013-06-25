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

}).listen(4000);

console.log('Proxy server Listening - http://localhost:4000');
