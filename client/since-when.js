
var React = require('react')

var SinceWhen = React.createClass({
  componentDidMount: function () {
    this._iv = setInterval(this.tick, 5000)
  },
  componentWillUnmount: function () {
    clearInterval(this._iv)
  },
  getDefaultProps: function () {
    return {
      prefix: ''
    }
  },
  getInitialState: function () {
    return {
      time: this.props.time.fromNow()
    }
  },
  tick: function () {
    if (!this.isMounted()) {
      return clearInterval(this._iv)
    }
    this.setState({time: this.props.time.fromNow()})
  },
  render: function () {
    return this.transferPropsTo(<span>{this.props.prefix + this.state.time}</span>)
  }
})

module.exports = SinceWhen
