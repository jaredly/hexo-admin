var Process = require('child_process')
var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
};

function once(fn) {
  var called = false
  return function () {
    if (!called) fn.apply(this, arguments)
    called = true
  }
}

module.exports = function (command, message, done) {
  done = once(done);
  console.log('run :' + command)
  Process.exec(command + ' ' + message, options, done)
}
