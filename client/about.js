var React = require('react')

var About = React.createClass({
  render: function () {
    return <div className="about">
      <h1>This is the Hexo Admin Plugin</h1>
      <p><strong>Goal: Provide an awesome admin experience for managing your blog.</strong></p>
      <p>
        Useful links:
        <ul>
          <li><a href="http://hexo.io">Hexo site</a></li>
          <li><a href="https://github.com/jaredly/hexo-admin-plugin">Github page for this plugin</a></li>
        </ul>
      </p>
    </div>
  }
})

module.exports = About

