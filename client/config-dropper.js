
var React = require('react/addons')
var AutoList = require('./auto-list')
var moment = require('moment')
var _ = require('lodash')
var cx = React.addons.classSet;

var dateFormat = 'MMM D YYYY HH:mm'

function toText(lst, map) {
  return lst.map((name) => map[name] || name)
}

function addMetadata(state, metadata, post){
  for(var i=0; i<metadata.length; i++){
    state[metadata[i]] = post[metadata[i]]
  }
}

function isMetadataEqual(state, metadata, post){
  var isEqual = true;
  for(var i=0; i<metadata.length && isEqual; i++){
    isEqual = isEqual && state[metadata[i]] === post[metadata[i]]
  }
  return isEqual
}

var ConfigDropper = React.createClass({
  getInitialState: function () {
    var tagCatMeta = this.props.tagsCategoriesAndMetadata
    var state = {
      open: false,
      date: moment(this.props.post.date).format(dateFormat),
      tags: toText(this.props.post.tags, tagCatMeta.tags),
      categories: toText(this.props.post.categories, tagCatMeta.categories),
      author: this.props.post.author,
    }
    addMetadata(state, tagCatMeta.metadata, this.props.post);
    return state
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.post === this.props.post) {
      return
    }
    var tagCatMeta = nextProps.tagsCategoriesAndMetadata
    var state = {
      date: moment(nextProps.post.date).format(dateFormat),
      tags: toText(nextProps.post.tags, tagCatMeta.tags),
      categories: toText(nextProps.post.categories, tagCatMeta.categories),
      author: nextProps.post.author,
    }
    addMetadata(state, tagCatMeta.metadata, nextProps.post);
    this.setState(state)
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      document.addEventListener('mousedown', this._globalMouseDown)
    }
    if (!this.state.open && prevState.open) {
      document.removeEventListener('mousedown', this._globalMouseDown)
    }
  },

  _globalMouseDown: function (e) {
    var mine = this.getDOMNode()
    var node = e.target
    while (node) {
      if (!node.parentNode) return
      node = node.parentNode;
      if (node === document.body) break;
      if (node === mine) return;
    }
    this._onClose()
  },

  _toggleShow: function () {
    if (this.state.open) {
      this.save()
    }
    this.setState({
      open: !this.state.open
    })
  },

  _onClose: function () {
    this.save()
    this.setState({open: false})
  },

  _onChangeDate: function (e) {
    this.setState({
      date: e.target.value
    })
  },

  _onChangeAuthor: function (e) {
    this.setState({
      author: e.target.value
    })
  },

  _onChangeMetadata: function (e) {
    var state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  },

  _onChange: function (attr, value) {
    var update = {}
    update[attr] = value
    this.setState(update);
  },

  save: function () {
    var date = moment(this.state.date)
    if (!date.isValid()) {
      date = moment(this.props.post.date)
    }
    var tagCatMeta = this.props.tagsCategoriesAndMetadata
    var tags = toText(this.props.post.tags, tagCatMeta.tags)
    var categories = toText(this.props.post.categories, tagCatMeta.categories)
    var author = this.props.post.author
    var textDate = date.toISOString()
    var isSameMetadata = isMetadataEqual(this.state, tagCatMeta.metadata, this.props.post)
    if (textDate === this.props.post.date &&
        _.isEqual(this.state.categories, categories) &&
        _.isEqual(this.state.tags, tags) && author === this.state.author &&
        isSameMetadata) {
      return
    }
    var state = {
      date: date.toISOString(),
      categories: this.state.categories,
      tags: this.state.tags,
      author: this.state.author,
    }
    addMetadata(state, tagCatMeta.metadata, this.state)
    this.props.onChange(state)
  },

  config: function () {
    return <div className="config">
      <div className="config_section">
        <div className="config_section-title">Date</div>
        <input
          className="config_date"
          value={this.state.date}
          onChange={this._onChangeDate}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">Author</div>
        <input
            className="config_author"
            value={this.state.author}
            onChange={this._onChangeAuthor}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">Tags</div>
        <AutoList
          options={this.props.tagsCategoriesAndMetadata.tags}
          values={this.state.tags}
          onChange={this._onChange.bind(null, 'tags')}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">Categories</div>
        <AutoList
          options={this.props.tagsCategoriesAndMetadata.categories}
          values={this.state.categories}
          onChange={this._onChange.bind(null, 'categories')}/>
      </div>
      {this.configMetadata()}
    </div>
  },

  configMetadata: function() {
    var metadata = this.props.tagsCategoriesAndMetadata.metadata;
    var self = this;
    return metadata.map(function(name, index){
      return (
        <div key={index} className="config_section">
          <div className="config_section-title">{name}</div>
          <input
            className="config_metadata"
            value={self.state[name]}
            name={name}
            onChange={self._onChangeMetadata}/>
        </div>
      )
    })
  },

  render: function () {
    return <div className={cx({
        "config-dropper": true,
        "config-dropper--open": this.state.open
      })}
           title="Settings">
      <div className="config-dropper_handle"
           onClick={this._toggleShow}>
        <i className="fa fa-gear"/>
      </div>
      {this.state.open && this.config()}
    </div>
  }
})

module.exports = ConfigDropper
