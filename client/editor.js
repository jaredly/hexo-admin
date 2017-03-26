
var path = require('path')
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var PT = React.PropTypes
var CodeMirror = require('./code-mirror')
var SinceWhen = require('./since-when')
var Rendered = require('./rendered')
var CheckGrammar = require('./check-grammar')
var ConfigDropper = require('./config-dropper')
var RenameFile = require('./rename-file')

var Editor = React.createClass({
  propTypes: {
    post: PT.object,
    raw: PT.string,
    updatedRaw: PT.string,
    onChangeTitle: PT.func,
    title: PT.string,
    updated: PT.object,
    isDraft: PT.bool,
    onPublish: PT.func.isRequired,
    onUnpublish: PT.func.isRequired,
    tagsCategoriesAndMetadata: PT.object,
    adminSettings: PT.object
  },

  getInitialState: function() {
    var url = window.location.pathname.split('/')
    var rootPath = url.slice(0, url.indexOf('admin')).join('/')
    return {
      previewLink: path.join(rootPath, this.props.post.path),
      checkingGrammar: false,
    }
  },

  handlePreviewLink: function(previewLink) {
    console.log('updating preview link')
    this.setState({
      previewLink: path.join(previewLink)
    })
  },

  handleChangeTitle: function (e) {
    return this.props.onChangeTitle(e.target.value)
  },

  handleScroll: function (percent) {
    if (!this.state.checkingGrammar) {
      var node = this.refs.rendered.getDOMNode()
      var height = node.getBoundingClientRect().height
      node.scrollTop = (node.scrollHeight - height) * percent
    }
  },

  onCheckGrammar: function () {
    this.setState({
      checkingGrammar: !this.state.checkingGrammar
    })
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
          tagsCategoriesAndMetadata={this.props.tagsCategoriesAndMetadata}
          onChange={this.props.onChange}/>}
        {!this.props.isPage && (this.props.isDraft ?
          <button className="editor_publish" onClick={this.props.onPublish}>
            Publish
          </button> :
          <button className="editor_unpublish" onClick={this.props.onUnpublish}>
            Unpublish
          </button>)}
          {!this.props.isPage && (this.props.isDraft ?
          <button className="editor_remove" title="Remove"
                  onClick={this.props.onRemove}>
            <i className="fa fa-trash-o" aria-hidden="true"/>
          </button> :
          <button className="editor_remove" title="Can't Remove Published Post"
                  onClick={this.props.onRemove} disabled>
            <i className="fa fa-trash-o" aria-hidden="true"/>
          </button>)}
          {!this.props.isPage &&
          <button className="editor_checkGrammar" title="Check for Writing Improvements"
                  onClick={this.onCheckGrammar}>
            <i className="fa fa-check-circle-o"/>
          </button>}
      </div>
      <div className="editor_main">
        <div className="editor_edit">
          <div className="editor_md-header">
            {this.props.updated &&
                <SinceWhen className="editor_updated"
                prefix="saved "
                time={this.props.updated}/>}
            <span>Markdown&nbsp;&nbsp;
              <RenameFile post={this.props.post}
                handlePreviewLink={this.handlePreviewLink} /></span>
          </div>
          <CodeMirror
            onScroll={this.handleScroll}
            initialValue={this.props.raw}
            onChange={this.props.onChangeContent}
            forceLineNumbers={this.state.checkingGrammar}
            adminSettings={this.props.adminSettings} />
        </div>
        <div className="editor_display">
          <div className="editor_display-header">
            <span className="editor_word-count">
              {this.props.wordCount} words
            </span>
            Preview
            {' '}<a className="editor_perma-link" href={this.state.previewLink} target="_blank">
              <i className="fa fa-link"/> {this.state.previewLink}
            </a>
          </div>
          {!this.state.checkingGrammar && <Rendered
            ref="rendered"
            className="editor_rendered"
            text={this.props.rendered}/>}
          {this.state.checkingGrammar && <CheckGrammar
            toggleGrammar={this.onCheckGrammar}
            raw={this.props.updatedRaw} />}
        </div>
      </div>
    </div>;
  }
})

module.exports = Editor
