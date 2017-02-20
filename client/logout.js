var React = require('react')

var Logout = React.createClass({
  _onLogout: function(){
    let home = document.location.toString()
    home = home.replace("admin/#/logout",'')
    window.location.href = home
  },
  render: function () {
    return (
      <div className="settings">
        <p>
          Are you sure to logout?
        </p>
        <button className="btn waves-effect waves-light" onClick={this._onLogout}> Yes </button>
      </div>
    )
  }
})

module.exports = Logout
