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
