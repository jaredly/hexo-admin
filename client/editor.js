
var React = require('react/addons')
var cx = React.addons.classSet
var Promise = require('es6-promise').Promise
var PT = React.PropTypes
var CodeMirror = require('./code-mirror')

var Editor = React.createClass({
  propTypes: {
    raw: PT.string,
    onChangeTitle: PT.func,
    title: PT.string,
  },

  handleChangeTitle: function (e) {
    return this.props.onChangeTitle(e.target.value)
  },

  handleChange: function (e) {
    this.props.onChange(e.target.value)
  },

  render: function () {
    return <div className="editor">
      <div className="editor_top">
        <input
          className='editor_title'
          value={this.props.title}
          onChange={this.handleChangeTitle}/>
      </div>
      <div className="editor_main">
        <div className="editor_edit">
          <div className="editor_md-header">
            Markdown
          </div>
          <CodeMirror
            initialValue={this.props.raw}
            onChange={this.props.onChange} />
        </div>
        <div className="editor_display">
          <div className="editor_display-header">
            Preview
          </div>
          <div className="editor_rendered" dangerouslySetInnerHTML={{
            __html: this.props.rendered
          }}/>
        </div>
      </div>
    </div>;
  }
})

module.exports = Editor
