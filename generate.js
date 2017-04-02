
var spawn = require('child_process').spawn

function once(fn) {
  var called = false
  return function () {
    if (!called) fn.apply(this, arguments)
    called = true
  }
}

module.exports = function (config, done) {
  done = once(done);

  var generateCommand = config.admin && config.admin.generateCommand ? config.admin.generateCommand.split(' ') : [];
  var command = generateCommand.length > 0 ? generateCommand[0] : 'hexo';
  generateCommand.shift();
  var options = generateCommand.length > 0 ? generateCommand : ['generate'];

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