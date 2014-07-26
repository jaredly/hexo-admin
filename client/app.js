
var Link = require('react-router').Link
var React = require('react')

var App = React.createClass({
  render: function () {
    return <div className="app">
      <div className="app_header">
        <img src="/images/icon.png"/>
        <span className="app_title">Hexo Admin</span>
        <ul className="app_nav">
          <li><Link to="posts">Posts</Link></li>
          <li><Link to="create">Create</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>
      </div>
      <div className="app_main">
        <this.props.activeRouteHandler/>
      </div>
    </div>;
  }
})

module.exports = App

