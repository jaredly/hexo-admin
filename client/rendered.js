
var React = require('react')

// DOMPurify & jsdom to mitigate the XSS vulnerability
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

var Rendered = React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },
  render: function () {
    return this.transferPropsTo(
      <div className="post-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(this.props.text) || '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
        }}/>)
  }
})

module.exports = Rendered;
