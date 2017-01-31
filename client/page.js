
var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var marked = require('marked')
var Editor = require('./editor')
var _ = require('lodash')
var moment = require('moment')

var Page = React.createClass({
  mixins: [DataFetcher((params) => {
    return {
      page: api.page(params.pageId),
      settings: api.settings(),
      //tagsCategoriesAndMetadata: api.tagsCategoriesAndMetadata()
    }
  })],

  getInitialState: function () {
    return {
      updated: moment()
    }
  },

  componentDidMount: function () {
    this._page = _.debounce((update) => {
      var now = moment()
      api.page(this.props.params.pageId, update).then(() => {
        this.setState({
          updated: now
        })
      })
    }, 1000, {trailing: true, loading: true})
  },

  handleChange: function (update) {
    var now = moment()
    api.page(this.props.params.pageId, update).then((data) => {
      this.setState({
        page: data.page,
        updated: now
      })
    })
  },

  handleChangeContent: function (text) {
    if (text === this.state.raw) {
      return
    }
    this.setState({
      raw: text,
      updated: null,
      rendered: marked(text)
    })
    this._page({_content: text})
  },

  handleChangeTitle: function (title) {
    if (title === this.state.title) {
      return
    }
    this.setState({title: title});
    this._page({title: title})
  },

  handlePublish: function () {
    if (!this.state.page.isDraft) return
    api.publish(this.state.page._id).then((page) => {
      this.setState({page: page})
    });
  },

  handleUnpublish: function () {
    if (this.state.page.isDraft) return
    api.unpublish(this.state.page._id).then((page) => {
      this.setState({page: page})
    });
  },

  dataDidLoad: function (name, data) {
    if (name !== 'page') return
    var parts = data.raw.split('---');
    var _slice = parts[0] === '' ? 2 : 1;
    var raw = parts.slice(_slice).join('---').trim();
    this.setState({
      title: data.title,
      initialRaw: raw,
      raw: raw,
      rendered: data.content
    })
  },

  render: function () {
    var page = this.state.page
    var settings = this.state.settings
    if (!page || !settings) {
      return <span>Loading...</span>
    }
    return Editor({
      isPage: true,
      post: this.state.page,
      raw: this.state.initialRaw,
      wordCount: this.state.raw ? this.state.raw.split(' ').length : 0,
      isDraft: page.isDraft,
      updated: this.state.updated,
      title: this.state.title,
      rendered: this.state.rendered,
      onChange: this.handleChange,
      onChangeContent: this.handleChangeContent,
      onChangeTitle: this.handleChangeTitle,
      onPublish: this.handlePublish,
      onUnpublish: this.handleUnpublish,
      tagsCategoriesAndMetadata: this.state.tagsCategoriesAndMetadata,
      adminSettings: settings
    })
  }
});

module.exports = Page;
