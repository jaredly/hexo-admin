
var React = require('react/addons')
var PT = React.PropTypes
var api = require('./api')

var SettingsCheckbox = React.createClass({
  propTypes: {
    cat: PT.string.isRequired,
    key: PT.string.isRequired,
    label: PT.string.isRequired,
    onClick: PT.func
  },

  getInitialState: function () {
    return {
      checked: true
    }
  },

  componentDidMount: function() {
    var cat = this.props.cat
    var key = this.props.key
    api.settings().then( (settings) => {
      var checked;
      if (!settings[cat]) {
        checked = false
      } else {
        checked = !!settings[cat][key]
      }
      this.setState({checked: checked})
    })
  },

  handleChange: function(e) {
    var category = this.props.cat
    var key = this.props.key
    var value = e.target.checked
    api.setSetting(category, key, value).then( (result) => {
      console.log(result.updated)
      this.setState({
        checked: result.settings[category][key]
      });
    });
  },

  render: function() {
    return (
      <p>
      <label>
          <input
            checked={this.state.checked}
            type="checkbox"
            onChange={this.handleChange}
            onClick={this.props.onClick}
          />
          &nbsp; {this.props.label}
        </label>
      </p>
    );
  }
});

module.exports = SettingsCheckbox
