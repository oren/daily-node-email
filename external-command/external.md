```js
// import the exec function defined on the child_process module
var exec = require('child_process').exec;
// launch the command "ls -la /tmp/"
exec('ls -la /tmp/', function(err, stdout, stderr) {
  // the command exited or the launching failed
  if (err) {
    console.log('child process exited with error code', err.code);
    return;
  };

  console.log(stdout);
});
```

```js
// Import the spawn function defined on child_process module
var spawn = require('child_process').spawn;
// Launch a child process with a “tail -f /var/log/system.log” command
// ChildProcess is an EventEmitter. it emits events like data and exit
var child = spawn('tail', ['-f', '/var/log/system.log']);

child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

child.on('exit', function (code, signal) {
  console.log('child process exited with code ' + code + ' and signal ' + signal);
});

child.on('error', function (err) {
  console.log('something went wrong:', err);
});

// kill the child process after 5 seconds
setTimeout(function() {
  child.kill();
}, 5000);
```