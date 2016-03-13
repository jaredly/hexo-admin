import { hashHistory , Router, Route, IndexRedirect } from 'react-router';
var App = require('./app');
var Post = require('./post');
var Posts = require('./posts');
var Page = require('./page');
var Pages = require('./pages');
var About = require('./about');
var Deploy = require('./deploy');

module.exports = () => {
  return <Router history={hashHistory }> 
    <Route component={App} path="/">
      <IndexRedirect to="/posts"/>
      <Route name="posts" component={Posts} path="/posts"/>
      <Route name="post" component={Post} path="/posts/:postId"/>
      <Route name="page" component={Page} path="/pages/:pageId"/>
      <Route name="pages" component={Pages} path="/pages"/>
      <Route name="about" component={About} path="/about" />
      <Route name="deploy" component={Deploy} path="/deploy"/>
    </Route>
  </Router>
}