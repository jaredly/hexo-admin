
var React = require('react/addons')
var cx = React.addons.classSet

var AutoList = React.createClass({
  getInitialState: function () {
    return {
      selected: null,
      text: ''
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (prevState.selected === null &&
        this.state.selected !== null) {
      setTimeout(() => this.refs.input.getDOMNode().focus(), 100)
    }
  },

  _onChange: function (e) {
    this.setState({text: e.target.value})
  },

  _onEdit: function (i, e) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      selected: i,
      text: this.props.values[i] || ''
    })
  },

  _onBlur: function () {
    var values = this.props.values.slice()
    if (this.props.values.indexOf(this.state.text) === -1) {
      if (this.state.selected >= values.length) {
        if (this.state.text) {
          values.push(this.state.text)
        }
      } else {
        values[this.state.selected] = this.state.text
      }
    }
    this.setState({
      selected: null,
      text: ''
    });
    this.props.onChange(values)
  },

  _onRemove: function (i) {
    var values = this.props.values.slice()
    if (i >= values.length) return
    values.splice(i, 1)
    if (this.state.selected !== null &&
        i < this.state.selected) {
      this.setState({selected: i-1})
    }
    this.props.onChange(values)
  },

  _onKeyDown: function (e) {
    if (e.key === 'Enter') {
      if (!this.state.text) return
      this.addAfter()
    }
  },

  addAfter: function () {
    if (this.props.values.indexOf(this.state.text) !== -1) {
      return
    }
    var values = this.props.values.slice()
    if (this.state.selected === values.length) {
      values.push(this.state.text)
      this.props.onChange(values)
      return this.setState({
        text: '',
        selected: values.length
      })
    }
    values[this.state.selected] = this.state.text
    values.splice(this.state.selected + 1, 0, '')
    this.props.onChange(values)
    this.setState({
      selected: this.state.selected + 1,
      text: ''
    })
  },

  render: function () {
    var values = this.props.values.concat(['Add new'])
    return <div className="autolist">
      {values.map((item, i) =>
        <div key={item} className="autolist_item">
          {i === this.state.selected ?
            <input
              ref="input"
              className="autolist_input"
              value={this.state.text}
              onBlur={this._onBlur}
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}/> :
            <div className={cx({
                    "autolist_show": true,
                    "autolist_show--new": i === values.length - 1,
                  })}
                  onMouseDown={this._onEdit.bind(null, i)}>
              {item}
            </div>
          }
          {i < values.length - 1 &&
            <i className="autolist_del fa fa-times"
               onClick={this._onRemove.bind(null, i)}/>}
        </div>
      )}
    </div>
  }
})

module.exports = AutoList
