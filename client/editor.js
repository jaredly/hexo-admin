
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var PT = React.PropTypes
var CodeMirror = require('./code-mirror')
var SinceWhen = require('./since-when')
var Rendered = require('./rendered')
var ConfigDropper = require('./config-dropper')

var Editor = React.createClass({
  propTypes: {
    post: PT.object,
    raw: PT.string,
    onChangeTitle: PT.func,
    title: PT.string,
    updated: PT.object,
    isDraft: PT.bool,
    onPublish: PT.func.isRequired,
    onUnpublish: PT.func.isRequired,
    tagsAndCategories: PT.object
  },

  handleChangeTitle: function (e) {
    return this.props.onChangeTitle(e.target.value)
  },

  handleScroll: function (percent) {
    var node = this.refs.rendered.getDOMNode()
    var height = node.getBoundingClientRect().height
    node.scrollTop = (node.scrollHeight - height) * percent
  },

  render: function () {
    return <div className={cx({
      "editor": true,
      "editor--draft": this.props.isDraft
    })}>
      <div className="editor_top">
        <input
          className='editor_title'
          value={this.props.title}
          onChange={this.handleChangeTitle}/>
        {!this.props.isPage && <ConfigDropper
          post={this.props.post}
          tagsAndCategories={this.props.tagsAndCategories}
          onChange={this.props.onChange}/>}
        {!this.props.isPage && (this.props.isDraft ?
          <button className="editor_publish" onClick={this.props.onPublish}>
            Publish
          </button> :
          <button className="editor_unpublish" onClick={this.props.onUnpublish}>
            Unpublish
          </button>)}
      </div>
      <div className="editor_main">
        <div className="editor_edit">
          <div className="editor_md-header">
            {this.props.updated &&
                <SinceWhen className="editor_updated"
                prefix="saved "
                time={this.props.updated}/>}
            Markdown
          </div>
          <CodeMirror
            onScroll={this.handleScroll}
            initialValue={this.props.raw}
            onChange={this.props.onChangeContent} />
        </div>
        <div className="editor_display">
          <div className="editor_display-header">
            <span className="editor_word-count">
              {this.props.wordCount} words
            </span>
            Preview
            {' '}<a className="editor_perma-link" href={this.props.previewLink} target="_blank">
              <i className="fa fa-link"/> {this.props.previewLink}
            </a>
          </div>
          <Rendered
            ref="rendered"
            className="editor_rendered"
            text={this.props.rendered}/>
        </div>
      </div>
    </div>;
  }
})

module.exports = Editor
