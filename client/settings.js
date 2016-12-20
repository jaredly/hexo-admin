
var React = require('react/addons')
var api = require('./api')
var SettingsCheckbox = require('./settings-checkbox')

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

    return (
      <div className="settings" style={divStyle}>
        <p>
          Set various settings for your admin panel and editor.
        </p>
        <h1>Editor Settings</h1>
        {LineNumbers}
        {SpellCheck}
      </div>
    );
  }
})

module.exports = Settings
