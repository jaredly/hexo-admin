
var React = require('react')
var CM = require('code-mirror')

var CodeMirror = React.createClass({
  componentDidUpdate: function (prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.cm.setValue(this.props.initialValue)
    }
  },
  componentDidMount: function () {
    require('code-mirror/mode/markdown')
    this.cm = CM(this.getDOMNode(), {
      value: this.props.initialValue || '',
      theme: require('code-mirror/theme/default'),
      mode: 'markdown',
      lineWrapping: true,
    });
    this.cm.on('change', (cm) => {
      this.props.onChange(cm.getValue())
    })
    var box = this.getDOMNode().getBoundingClientRect()
    this.cm.setSize(box.width, box.height)

    window.addEventListener('resize', () => {
      var box = this.getDOMNode().getBoundingClientRect()
      this.cm.setSize(box.width, box.height)
    })
  },

  render: function () {
    return this.transferPropsTo(<div/>)
  }
})

module.exports = CodeMirror
