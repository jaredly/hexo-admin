
var React = require('react/addons')
var bcrypt = require('bcrypt-nodejs')

var AdminYaml = React.createClass({
  getInitialState: function() {
    return {
      passwordHash: '$2a$10$L.XAIqIWgTc5S1zpvV3MEu7/rH34p4Is/nq824smv8EZ3lIPCp1su'
    }
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.password !== this.props.password) {
      var salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(this.props.password, salt)
      this.setState({passwordHash: hash})
    }
  },

  render: function() {

    var adminYaml = [
      '# hexo-admin authentification',
      'admin:',
      '  username: ' + this.props.username,
      '  password_hash: ' + this.state.passwordHash,
      '  secret: ' + this.props.secret
    ].join('\n')
    return (
      <pre>
        {adminYaml}
      </pre>
    )
  }
})

var AuthSetup = React.createClass({
  getInitialState: function() {
    return {
      username: 'username',
      password: 'password',
      secret: 'my super secret phrase'
    }
  },

  handleUsernameChange: function(e) {
    this.setState({username: e.target.value})
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value})
  },

  handleSecretChange: function(e) {
    this.setState({secret: e.target.value})
  },

  render: function() {
    return (
      <div className='authSetup'>
        <h1>Authentification Setup</h1>
        <p>
          You can secure hexo-admin with a password by adding a section to your&nbsp;
          <code>_config.yml</code>. This page is here to easily get it setup up.
          Simply fill in the following fields and copy and paste the generated
          text section into your config file.
        </p>
        <div>
          <label>Username:</label>
          <p>The username you'll use to log in.</p>
          <input type='text'
                 onChange={this.handleUsernameChange}
                 defaultValue={this.state.username}></input>
        </div>
        <div>
        <label>Password:</label>
          <p>The password you'll use to log in. This will be encrypted to store in your config.</p>
          <input type='text'
                 onChange={this.handlePasswordChange}
                 defaultValue={this.state.password}></input>
        </div>
        <div>
        <label>Secret:</label>
          <p>This is used to encrypt cookies; make it long and obscure.</p>
          <input type='text'
                 onChange={this.handleSecretChange}
                 defaultValue={this.state.secret}></input>
        </div>
        <h2>Admin Config Section</h2>
        <p>
          Copy this into your <code>_config.yml</code>, and restart Hexo. Now you'll
          be protected with a password!
        </p>
        <AdminYaml username={this.state.username}
                   password={this.state.password}
                   secret={this.state.secret}/>
      </div>
    );
  }
})

module.exports = AuthSetup
