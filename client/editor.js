
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var PT = React.PropTypes
var CodeMirror = require('./code-mirror')
var SinceWhen = require('./since-when')

var Editor = React.createClass({
  propTypes: {
    raw: PT.string,
    onChangeTitle: PT.func,
    title: PT.string,
    updated: PT.object,
  },

  handleChangeTitle: function (e) {
    return this.props.onChangeTitle(e.target.value)
  },

  handleChange: function (e) {
    this.props.onChange(e.target.value)
  },

  handleScroll: function (percent) {
    var node = this.refs.rendered.getDOMNode()
    var height = node.getBoundingClientRect().height
    node.scrollTop = (node.scrollHeight - height) * percent
  },

  render: function () {
    return <div className="editor">
      <div className="editor_top">
        <input
          className='editor_title'
          value={this.props.title}
          onChange={this.handleChangeTitle}/>
        {this.props.updated &&
            <SinceWhen className="editor_updated"
            prefix="saved "
            time={this.props.updated}/>}
      </div>
      <div className="editor_main">
        <div className="editor_edit">
          <div className="editor_md-header">
            Markdown
          </div>
          <CodeMirror
            onScroll={this.handleScroll}
            initialValue={this.props.raw}
            onChange={this.props.onChange} />
        </div>
        <div className="editor_display">
          <div className="editor_display-header">
            Preview
          </div>
          <div
            ref="rendered"
            className="editor_rendered"
            dangerouslySetInnerHTML={{
              __html: this.props.rendered || '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
            }}/>
        </div>
      </div>
    </div>;
  }
})

module.exports = Editor
