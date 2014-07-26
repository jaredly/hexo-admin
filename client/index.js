
var router = require('./router')
var React = require('react')

module.exports = function (node) {
  React.renderComponent(router(), node)
}

