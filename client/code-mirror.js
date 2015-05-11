
var React = require('react')
var CM = require('code-mirror')
var PT = React.PropTypes
var api = require('./api')

var CodeMirror = React.createClass({
  propTypes: {
    onScroll: PT.func
  },

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
    this.cm.on('scroll', (cm) => {
      var node = cm.getScrollerElement()
      var max = node.scrollHeight - node.getBoundingClientRect().height
      this.props.onScroll(node.scrollTop / max)
    })
    var box = this.getDOMNode().getBoundingClientRect()
    this.cm.setSize(box.width, box.height)

    window.addEventListener('resize', this._onResize)

    document.addEventListener('paste', this._onPaste)
  },

  _onResize: function () {
    var box = this.getDOMNode().getBoundingClientRect()
    this.cm.setSize(box.width, box.height)
  },

  componentWillUnmount: function () {
    document.removeEventListener('paste', this._onPaste)
    document.removeEventListener('resize', this._onResize)
  },

  _onPaste: function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    if (!items.length) return
    var blob;
    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i].kind == 'file'){
        blob = items[i].getAsFile();
        break;
      }
    };
    if (!blob) return
    var reader = new FileReader();
    reader.onload = (event) => {
      api.uploadImage(event.target.result).then((src) =>
        this.cm.replaceSelection('![pasted image](' + src + ')')
      );
    };
    reader.readAsDataURL(blob);
  },

  render: function () {
    return <div/>
  }
})

module.exports = CodeMirror
