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
