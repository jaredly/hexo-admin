
var admin = require('./')
  , api = require('./api')

api.init('/admin/api');

document.addEventListener('DOMContentLoaded', () => {
    var node = document.createElement('div')
    document.body.appendChild(node)
    admin(node)
});

