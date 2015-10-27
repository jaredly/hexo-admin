var React = require('react')
var divStyle = {
    whiteSpace: 'nowrap'
  };
var Deploy = React.createClass({
  getInitialState: function() {
    return {
      stdout: '',
      stderr: ''
    };
  },
  handleSubmit: function(e) {
    console.log(this.refs.commit.state.value);
    e.preventDefault();
	this.setState({
      stdout: 'loading',
      stderr: 'loading'
    });
    $.post("/admin/deploy", {commit:this.refs.commit.state.value}, function(result) {
	  if (this.isMounted()) {
	    var lines = result.stdout.trim();
	    var br = lines.split('\n').map(function(line) {
            if(line==="")
			    return "None";
		    else
			    return (<span>{line}<br/></span>);
        });
	    var lines2 = this.state.stderr.trim();
	    var br2 = lines2.split('\n').map(function(line) {
            if(line==="")
			    return "None";
		    else
			    return (<span>{line}<br/></span>);
        });
		if(!!br2){
			br2="None";
		}
        this.setState({
          stdout: br,
          stderr: br2
        });
      }
    }.bind(this));
  },
  render: function () {
    
    return (
	    <div className="deploy" style={divStyle}>
	    <form onSubmit={this.handleSubmit}>
		  <input type="text" placeholder="commit log" ref="commit" />
		  <input type="submit" value="Deploy" />
		</form>
        <h1>Output</h1>
        <p><strong>{this.state.stdout}</strong></p>
	    <h1>Error</h1>
	    <p><strong>{this.state.stderr}</strong></p>
        </div>
		)
    ;
  }
})

module.exports = Deploy
