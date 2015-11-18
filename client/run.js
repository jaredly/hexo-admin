
var admin = require('./')
  , api = require('./api')

// for debugging
window.React = require('react');

var url = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/');
var rootPath = url.slice(0, url.indexOf('admin')).join('/');
api.init('rest', rootPath + '/admin/api');

document.addEventListener('DOMContentLoaded', () => {
  var node = document.createElement('div');
  document.body.appendChild(node);
  admin(node);
});
