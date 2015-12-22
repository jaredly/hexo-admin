
var spawn = require('child_process').spawn

function once(fn) {
  var called = false
  return function () {
    if (!called) fn.apply(this, arguments)
    called = true
  }
}

module.exports = function (config, message, done) {

  var deployCommand = config.admin && config.admin.deployCommand ? config.admin.deployCommand.split(' ') : [];
  var command = deployCommand.length > 0 ? deployCommand[0] : 'hexo';
  generateCommand.shift();
  var options = deployCommand.length > 0 ? deployCommand : ['deploy'];

  if (message && message !== '') {
    options.push('-m ' + message + '');
  }

  done = once(done);
  var proc = spawn(command, options, {detached: true});
  var stdout = '';
  var stderr = '';
  proc.stdout.on('data', function(data){ stdout += data.toString() });
  proc.stderr.on('data', function(data){ stderr += data.toString() });
  proc.on('error', function(err) {
    done(err, {stdout: stdout, stderr: stderr});
  });
  proc.on('close', function () {
    done(null, {stdout: stdout, stderr: stderr});
  });
}
