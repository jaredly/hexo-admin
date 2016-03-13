import router from './router';
var React = require('react');
var ReactDOM = require('react-dom');

module.exports = function (node) {
  ReactDOM.render(router(), node);
}