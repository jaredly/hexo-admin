
var App = require('./app');
var Post = require('./post')
var Posts = require('./posts')
var About = require('./about')
var Route = require('react-router').Route

module.exports = () => {
  return <Route handler={App}>
    <Route name="posts" handler={Posts} path="/"/>
    <Route name="create" handler={Post} path="/posts/new"/>
    <Route name="post" handler={Post} path="/posts/:postId"/>
    <Route name="about" handler={About}/>
  </Route>
}

