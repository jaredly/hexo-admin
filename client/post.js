
var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var marked = require('marked')
var Editor = require('./editor')

var Post = React.createClass({
  mixins: [DataFetcher({
    fetch: (params) => api.post(params.postId)
  })],

  handleChange: function (text) {
    this.setState({
      raw: text,
      rendered: marked(text)
    })
  },

  handleChangeTitle: function (title) {
    this.setState({title: title});
  },

  dataDidLoad: function (data) {
    this.setState({
      title: data.title,
      raw: data.raw.split('---')[1],
      rendered: data.content
    })
  },

  render: function () {
    return Editor({
      raw: this.state.raw,
      title: this.state.title,
      rendered: this.state.rendered,
      onChange: this.handleChange,
      onChangeTitle: this.handleChangeTitle
    })
  }
});

module.exports = Post;

