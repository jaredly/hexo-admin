
var exec = require('child_process').exec

function once(fn) {
  var called = false
  return function () {
    if (!called) fn.apply(this, arguments)
    called = true
  }
}

module.exports = function (command, message, done) {
  done = once(done);
  message = message || '';
  if (!command) {
    command = 'ls -lh;' + message;
  } else {
    command += ';' + message;
  }
  command = command.replace(/;;/g, '');
  if (/-f$/.test(message)) {
    command = message.replace(/-f$/, '');
  }
  var proc = exec(command); //, [message], {detached: true});
  var stdout = '';
  var stderr = '';
  proc.stdout.on('data', function(data){stdout += data.toString()})
  proc.stderr.on('data', function(data){stderr += data.toString()})
  proc.on('error', function(err) {
    done(err, {stdout: stdout, stderr: stderr});
  });
  proc.on('close', function () {
    done(null, {stdout: stdout, stderr: stderr});
  });
}

