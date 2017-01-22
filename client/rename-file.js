
var React = require('react/addons')
var PT = React.PropTypes
var api = require('./api')

var RenameFile = React.createClass({
  propTypes: {
    post: PT.object
  },

  getInitialState: function() {
    return {
      filename: '',
      editing: false,
      editingName: ''
    }
  },

  componentDidMount: function() {
    var filename = this.props.post.source
    this.setState({
      filename: filename,
      editingName: filename
    })
  },

  toggleEditing: function() {
    this.setState({
      editing: !this.state.editing,
      editingName: this.state.filename
    })
  },

  handleEditChange: function(e) {
    this.setState({editingName: e.target.value})
  },

  handleRenameFile: function(e) {
    var postId = this.props.post._id
    var editingName = this.state.editingName
    api.renamePost(postId, editingName).then(result => {
      console.log(`successfully renamed file to ${editingName}`)
      this.setState({filename: editingName, editing: false})
    })
  },

  render: function() {
    return (
      <div className='fileRename'>
        {!this.state.editing &&
          <div className='fileRename_display'
            title='Click to rename'
            onClick={this.toggleEditing}>
            {this.state.filename}
          </div>}
        {this.state.editing && <span>
          <input type='text'
            onChange={this.handleEditChange}
            defaultValue={this.state.editingName} />
          <span className='fileRename_buttons'>
            <i title='Cancel'
              className='fa fa-times'
              onClick={this.toggleEditing} />
            <i title='Rename File'
              className='fa fa-check'
              onClick={this.handleRenameFile} />
          </span></span>}
      </div>
    )
  }
})

module.exports = RenameFile
