var React = require('react')
var exec = require('child_process').exec;

var Deploy = React.createClass({
  render: function () {
    exec("~/workspace/deploy.sh", function (error, stdout, stderr) {
        return <div className="deploy">
        <h1>Output</h1>
        <p><strong>{stdout}</strong></p>
	    	<h1>Error</h1>
	    	<p><strong>{stderr}</strong></p>
        </div>
    });
  }
})

module.exports = Deploy
