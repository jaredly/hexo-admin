
var path = require('path')
var React = require('react/addons')
var cx = React.addons.classSet
var Link = require('react-router').Link;
var Router = require('react-router');
var _ = require('lodash')
var moment = require('moment')
var SinceWhen = require('./since-when')

var Rendered = require('./rendered')
var DataFetcher = require('./data-fetcher');
var NewPost = require('./new-post')
var api = require('./api');

var Posts = React.createClass({
  mixins: [DataFetcher((params) => {
    return {
      posts: api.posts().then((posts) =>
        _.sortBy(_.filter(posts, function(post) { return !post.isDiscarded }), ['isDraft', 'date']).reverse()
      )
    }
  })],

  getInitialState: function () {
    return {
      selected: 0
    }
  },

  _onNew: function (post) {
    var posts = this.state.posts.slice()
    posts.unshift(post)
    this.setState({posts: posts})
    Router.transitionTo('post', {postId: post._id})
  },

  goTo: function (id, e) {
    if (e) {
      e.preventDefault()
    }
    Router.transitionTo('post', {postId: id})
  },

  render: function () {
    if (!this.state.posts) {
      return <div className='posts'>Loading...</div>
    }
    var current = this.state.posts[this.state.selected] || {}
    var url = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/')
    var rootPath = url.slice(0, url.indexOf('admin')).join('/')
    return <div className="posts">
      <ul className='posts_list'>
        <NewPost onNew={this._onNew}/>
        {
          this.state.posts.map((post, i) =>
            <li key={post._id} className={cx({
                "posts_post": true,
                "posts_post--draft": post.isDraft,
                "posts_post--selected": i === this.state.selected
              })}
              onDoubleClick={this.goTo.bind(null, post._id)}
              onClick={this.setState.bind(this, {selected: i}, null)}
            >
              <span className="posts_post-title">
                {post.title}
              </span>
              <span className="posts_post-date">
                {moment(post.date).format('MMM Do YYYY')}
              </span>
              <a className='posts_perma-link' target="_blank" href={path.join(rootPath, '/', post.path)}>
                <i className='fa fa-link'/>
              </a>
              <Link className='posts_edit-link' to="post" postId={post._id}>
                <i className='fa fa-pencil'/>
              </Link>
            </li>
          )
        }
      </ul>
      <div className={cx({
        'posts_display': true,
        'posts_display--draft': current.isDraft
      })}>
        {current.isDraft && <div className="posts_draft-message">Draft</div>}
        <Rendered
          ref="rendered"
          className="posts_content"
          text={current.content}/>
      </div>
    </div>
  }
});

module.exports = Posts;
