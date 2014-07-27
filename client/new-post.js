
var React = require('react')
var PT = React.PropTypes
var api = require('./api')

var NewPost = React.createClass({
  propTypes: {
    onNew: PT.func
  },

  getInitialState: function () {
    return {
      showing: false,
      loading: true,
      text: 'Untitled'
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.showing && !prevState.showing) {
      var node = this.refs.input.getDOMNode()
      node.focus()
      node.selectionStart = 0
      node.selectionEnd = node.value.length
    }
  },

  _onShow: function () {
    this.setState({showing: true})
  },

  _onSubmit: function () {
    this.setState({loading: true})
    api.newPost(this.state.text).then((post) => {
      this.setState({showing: false, text: 'Untitled'})
      this.props.onNew(post)
    }, (err) => {
      console.error('Failed! to make post', err)
    })
  },

  _onCancel: function () {
    this.setState({showing: false})
  },

  _onChange: function (e) {
    this.setState({
      text: e.target.value
    })
  },

  render: function () {
    if (!this.state.showing) {
      return <div className="new-post" onClick={this._onShow}>
        <div className="new-post_button">
          <i className="fa fa-plus"/>{' '}
          New Post
        </div>
      </div>
    }

    return <div className="new-post">
      <input className="new-post_input"
        ref="input"
        value={this.state.text}
        onChange={this._onChange}
        />
      <i className="fa fa-ok new-post_ok"
        onClick={this._onSubmit} >K</i>
      <i className="fa fa-cancel new-post_cancel"
        onClick={this._onCancel} >X</i>
    </div>
  }
})

module.exports = NewPost
