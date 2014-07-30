
var types = {
  rest: require('./rest'),
}

var mod = {
  init: (type, config) => {
    if ('string' === typeof type) {
      type = types[type]
    }
    var api = type(config)
    for (var name in api) {
      mod[name] = api[name]
    }
  }
};

module.exports = mod;

