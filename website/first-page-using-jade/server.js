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
