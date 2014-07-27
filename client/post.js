
var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var marked = require('marked')
var Editor = require('./editor')
var _ = require('lodash')
var moment = require('moment')

var Post = React.createClass({
  mixins: [DataFetcher({
    fetch: (params) => api.post(params.postId)
  })],

  getInitialState: function () {
    return {
      updated: moment()
    }
  },

  componentDidMount: function () {
    this._post = _.debounce((update) => {
      var now = moment()
      api.post(this.props.params.postId, update).then(() => {
        this.setState({
          updated: now
        })
      })
    }, 1000, {trailing: true, loading: true})
  },

  handleChange: function (text) {
    if (text === this.state.raw) {
      return
    }
    this.setState({
      raw: text,
      rendered: marked(text)
    })
    this._post({_content: text})
  },

  handleChangeTitle: function (title) {
    if (title === this.state.title) {
      return
    }
    this.setState({title: title});
    this._post({title: title})
  },

  dataDidLoad: function (data) {
    var parts = data.raw.split('---');
    var raw = parts.slice(1).join('---').trim();
    this.setState({
      title: data.title,
      initialRaw: raw,
      raw: raw,
      rendered: data.content
    })
  },

  render: function () {
    return Editor({
      raw: this.state.initialRaw,
      updated: this.state.updated,
      title: this.state.title,
      rendered: this.state.rendered,
      onChange: this.handleChange,
      onChangeTitle: this.handleChangeTitle
    })
  }
});

module.exports = Post;

