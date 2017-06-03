
var React = require('react')
var PT = React.PropTypes
var api = require('./api')
var Router = require('react-router');

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

  _onKeydown: function (e) {
    if (e.key === 'Enter') {
      this._onSubmit(e)
    }
  },

  _onShow: function () {
    this.setState({showing: true})
  },

  _onBlur: function () {
    if (this.state.showing) {
      this._onCancel();
    }
  },

  _onSubmit: function (e) {
    e.preventDefault();
    this.setState({loading: true, showing: false})
    api.newPost(this.state.text).then((post) => {
      this.setState({showing: false, text: 'Untitled'})
      if (this.props.onNew) {
        this.props.onNew(post)
      } else {
        Router.transitionTo('post', {postId: post._id})
      }
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
        onBlur={this._onBlur}
        onKeyPress={this._onKeydown}
        onChange={this._onChange}
        />
      <i className="fa fa-check-circle new-post_ok"
        onMouseDown={this._onSubmit}
        onTouchStart={this._onSubmit}
        ></i>
      <i className="fa fa-times-circle new-post_cancel"
        onMouseDown={this._onCancel} 
        onTouchStart={this._onCancel} 
        ></i>
    </div>
  }
})

module.exports = NewPost
