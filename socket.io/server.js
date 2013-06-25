var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
var fs = require('fs');

http.listen(3000);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function(err, data) {
      if (err) {
       res.writeHead(500);
       return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    }
  );
}

setInterval(function() {
  getCallsFromDB(function(calls) {
    io.sockets.emit('phone event', calls);
  });
}, 2000);

io.sockets.on('connection', function (socket) {
});

// TODO: connect to a real DB
function getCallsFromDB(cb) {
  cb({data: 'joe the plumebr got call in NJ'});
};

console.log('listening on localhost:3000');
