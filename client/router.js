
var App = require('./app');
var Post = require('./post')
var Posts = require('./posts')
var Page = require('./page')
var Pages = require('./pages')
var About = require('./about')
var Deploy = require('./deploy')
var Settings = require('./settings')
var AuthSetup = require('./auth-setup')
var Route = require('react-router').Route

module.exports = () => {
  return <Route handler={App}>
    <Route name="posts" handler={Posts} path="/"/>
    <Route name="post" handler={Post} path="/posts/:postId"/>
    <Route name="page" handler={Page} path="/pages/:pageId"/>
    <Route name="pages" handler={Pages} path="/pages"/>
    <Route name="about" handler={About}/>
    <Route name="deploy" handler={Deploy}/>
    <Route name="settings" handler={Settings}/>
    <Route name="auth-setup" handler={AuthSetup}/>
  </Route>
}
