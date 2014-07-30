
var marked = require('marked')
var _ = require('lodash')

var anchorId = function(str){
  return str
    .replace(/\s+/g, '_')
    .replace(/\./g, '-')
    .replace(/-{2,}/g, '-');
};

marked.setOptions({
  langPrefix: '',
});

module.exports = function(data, options){
  headingId = {};

  return marked(data.text, _.extend({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  }, options));
};

