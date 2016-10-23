
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
                        cat: 'editor',
                        key: 'lineNumbers',
                        label: 'Enable line numbering.'
                      });

    return (
      <div className="settings" style={divStyle}>
        <p>
          Set various settings for your admin panel and editor.
        </p>
        <h1>Editor Settings</h1>
        {LineNumbers}
      </div>
    );
  }
})

module.exports = Settings
