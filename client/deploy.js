var React = require('react')
var api = require('./api')

var divStyle = {
  whiteSpace: 'nowrap'
};

var Deploy = React.createClass({
  getInitialState: function() {
    return {
      stdout: '',
      stderr: '',
      error: null,
      message: '',
      status: 'initial',
    };
  },

  processOutput: function(prevData, newData) {
    return {
      status: newData.error ? 'error' : 'success',
      error: newData.error,
      stdout: (prevData ? prevData.stdout : '') + (newData ? newData.stdout.trim() : ''),
      stderr: (prevData ? prevData.stderr : '') + (newData ? newData.stderr.trim() : '')
    };
  },

  deploy: function(data) {
    return new Promise((resolve, reject) => {
      this.setState({status: 'loading'});
      api.deploy(this.state.message).then(result => {
        const output = this.processOutput(data, result);
        resolve(output);
      });
    });
  },

  generate: function(data) {
    return new Promise((resolve, reject) => {
      this.setState({status: 'loading'});
      api.generate().then(result => {
        const output = this.processOutput(data, result);
        resolve(output);
      });
    });
  },

  handleDeploy: function(e) {
    e.preventDefault();
    this.deploy().then(result => this.setState(result));
  },

  handleGenerate: function(e) {
    e.preventDefault();
    this.generate().then(result => this.setState(result));
  },

  handleSync: function(e) {
    e.preventDefault();
    this.generate().then(result => this.deploy(result)).then(result => this.setState(result));
  },

  render: function () {
    var body = '';

    if (this.state.error) {
      body = <h4>Error: {this.state.error}</h4>
    } else if (this.state.status === 'loading') {
      body = <h4>Loading...</h4>
    } else if (this.state.status === 'success') {
      body = (
        <div>
          <h4>Output</h4>
          <pre>
            {this.state.stdout}
          </pre>
          <h4>Error</h4>
          <pre>
            {this.state.stderr}
          </pre>
        </div>
      );
    }

    return (
      <div className="deploy" style={divStyle}>
        <div className="deploy_options">
          <h1> Publish changes to server </h1>
          <p>
            Click here to sync your changes <small>(this will run generate and deploy)</small>
          </p>
          <form className='deploy_form' onSubmit={this.handleSync}>
            <input
              type="text"
              className="deploy_message md"
              value={this.state.message}
              placeholder="Deploy message (optional)"
              onChange={e => this.setState({message: e.target.value})}
            />
          <input type="submit" value="Publish" />
          </form>
          <hr/>
          <h4>Advanced options</h4>
          <form className='deploy_form' onSubmit={this.handleGenerate}>
            <p><b>Generate:</b></p>
            <input type="submit" value="Generate files" />
            <small> (Click here to generate static files)</small>
          </form>
          <form className='deploy_form' onSubmit={this.handleDeploy}>
            <p><b>Deploy:</b></p>
            <input
              type="text"
              className="deploy_message "
              value={this.state.message}
              placeholder="DDeploy/commit message"
              onChange={e => this.setState({message: e.target.value})}
            />
            <input type="submit" value="Deploy" />
            <small> (Click here to deploy your static files)</small>
          </form>
        </div>
        <div className="deploy_output">
          {body}
        </div>
      </div>
    )
    ;
  }
})

module.exports = Deploy
