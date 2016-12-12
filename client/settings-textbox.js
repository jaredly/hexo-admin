
var React = require('react/addons')
var PT = React.PropTypes
var api = require('./api')

var SettingsTextbox = React.createClass({
  propTypes: {
    name: PT.string.isRequired,
    defaultValue: PT.string.isRequired,
    label: PT.string.isRequired
  },

  getInitialState: function () {
    return {
      value: this.props.defaultValue
    }
  },

  componentDidMount: function() {
    var name = this.props.name
    var defaultValue = this.props.defaultValue
    api.settings().then( (settings) => {
      var value;
      if (!settings.options) {
        value = defaultValue
      } else {
        if(!settings.options[name]) {
          value = defaultValue
        } else {
          value = settings.options[name]
        }
      }
      this.setState({value: value})
    })
  },

  handleChange: function(e) {
    var name = this.props.name
    var value = e.target.value
    api.setSetting(name, value).then( (result) => {
      console.log(result.updated)
      this.setState({
        value: result.settings.options[name]
      });
    });
  },

  render: function() {
    return (
      <p>
        <b>{this.props.label}:  </b>
        <input
          type="text"
          onChange={this.handleChange}
          value ={this.state.value}
        />
      </p>
    );
  }
});

module.exports = SettingsTextbox
