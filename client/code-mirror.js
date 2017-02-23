
var React = require('react')
var CM = require('codemirror/lib/codemirror')
var PT = React.PropTypes
var api = require('./api')

var CodeMirror = React.createClass({
  propTypes: {
    onScroll: PT.func,
    forceLineNumbers: PT.bool,
    adminSettings: PT.object
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.cm.setValue(this.props.initialValue)
    }
    // on forcing line numbers, set or unset linenumbers if not set in adminSettings
    if (prevProps.forceLineNumbers !== this.props.forceLineNumbers) {
      if (!(this.props.adminSettings.editor || {}).lineNumbers) {
        this.cm.setOption('lineNumbers', this.props.forceLineNumbers);
      }
    }
  },

  componentDidMount: function () {
    require('codemirror/mode/markdown/markdown')

    var editorSettings = {
      value: this.props.initialValue || '',
      theme: 'default',
      mode: 'markdown',
      lineWrapping: true,
    }
    for (var key in this.props.adminSettings.editor) {
      editorSettings[key] = this.props.adminSettings.editor[key]
    }

    this.cm = CM(this.getDOMNode(), editorSettings);
    this.cm.on('change', (cm) => {
      this.props.onChange(cm.getValue())
    })
    this.cm.on('scroll', (cm) => {
      var node = cm.getScrollerElement()
      var max = node.scrollHeight - node.getBoundingClientRect().height
      this.props.onScroll(node.scrollTop / max)
    })
    var box = this.getDOMNode().parentNode.getBoundingClientRect()
    this.cm.setSize(box.width, box.height - 32)

    window.addEventListener('resize', this._onResize)

    document.addEventListener('paste', this._onPaste)
  },

  _onResize: function () {
    var box = this.getDOMNode().parentNode.getBoundingClientRect()
    // need to subtract header to get proper height without flexbox (see #124)
    this.cm.setSize(box.width, box.height - 32)
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

    var settings = this.props.adminSettings
    var reader = new FileReader();
    reader.onload = (event) => {
      var filename = null;
      if (settings.options) {
        if(!!settings.options.askImageFilename) {
          var filePath = !!settings.options.imagePath ? settings.options.imagePath : '/images'
          filename = prompt(`What would you like to name the photo? All files saved as pngs. Name will be relative to ${filePath}.`, 'image.png')
        }
      }
      console.log(filename)
      api.uploadImage(event.target.result, filename).then((res) =>
        this.cm.replaceSelection(`\n![${res.msg}](${res.src})`)
      );
    };
    reader.readAsDataURL(blob);
  },

  render: function () {
    return <div/>
  }
})

module.exports = CodeMirror
