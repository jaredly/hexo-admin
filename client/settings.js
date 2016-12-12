
var React = require('react/addons')
var api = require('./api')
var SettingsCheckbox = require('./settings-checkbox')
var SettingsTextbox = require('./settings-textbox')

var divStyle = {
  whiteSpace: 'nowrap'
};

var Settings = React.createClass({
  getInitialState: function() {
    return {
      updated: null,
      error: null,
      status: 'initial',
    };
  },

  render: function () {
    var LineNumbers = SettingsCheckbox({
      name: 'lineNumbers',
      enableOptions: {editor: {lineNumbers: true}},
      disableOptions: {editor: {lineNumbers: false}},
      label: 'Enable line numbering.'
    });

    var SpellCheck = SettingsCheckbox({
      name: 'spellcheck',
      enableOptions: {editor: {inputStyle: 'contenteditable', spellcheck: true}},
      disableOptions: {editor: {inputStyle: null, spellcheck: false}},
      label: 'Enable spellchecking. (buggy on older browsers)'
    });

    var ImageAskToSave = SettingsCheckbox({
      name: 'askImageFilename',
      label: 'Always ask for filename.'
    });

    var ImagePath = SettingsTextbox({
      name: 'imagePath',
      defaultValue: '/images',
      label: 'Image directory'
    });

    var ImagePrefix = SettingsTextbox({
      name: 'imagePrefix',
      defaultValue: 'pasted-',
      label: 'Image filename prefix'
    });

    return (
      <div className="settings" style={divStyle}>
        <h1>Settings</h1>
        <p>
          Set various settings for your admin panel and editor.
        </p>
        <h2>Editor Settings</h2>
        {LineNumbers}
        {SpellCheck}
        <h2>Image Pasting Settings</h2>
        <p>
          Hexo-admin allows you to paste images you copy from the web or elsewhere directly
          into the editor. Decide how you'd like to handle the pasted images.
        </p>
        {ImageAskToSave}
        {ImagePath}
        {ImagePrefix}

      </div>
    );
  }
})

module.exports = Settings
