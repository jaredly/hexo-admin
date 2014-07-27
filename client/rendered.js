
var React = require('react')

var Rendered = React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render: function () {
    return this.transferPropsTo(
      <div className="post-content"
        dangerouslySetInnerHTML={{
          __html: this.props.text || '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
        }}/>)
  }
})

module.exports = Rendered;
