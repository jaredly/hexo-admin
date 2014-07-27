
var React = require('react/addons')
var cx = React.addons.classSet
var Link = require('react-router').Link;
var Router = require('react-router');
var _ = require('lodash')
var moment = require('moment')

var DataFetcher = require('./data-fetcher');
var NewPost = require('./new-post')
var api = require('./api');

var Posts = React.createClass({
  mixins: [DataFetcher({
    fetch: () => api.posts().then((data) => 
      _.sortBy(data, (post) => moment(post.date)).reverse()
    )
  })],

  getInitialState: function () {
    return {
      selected: 0
    }
  },

  _onNew: function (post) {
    var posts = this.state.data.slice()
    posts.unshift(post)
    this.setState({data: posts})
    Router.transitionTo('post', {postId: post._id})
  },

  render: function () {
    if (!this.state.data) {
      return <div className='posts'>Loading...</div>
    }
    var current = this.state.data[this.state.selected] || {}
    return <div className="posts">
      <ul className='posts_list'>
        <NewPost onNew={this._onNew}/>
        {
          this.state.data.map((post, i) => 
            <li key={post._id} className={cx({
                "posts_post": true,
                "posts_post--selected": i === this.state.selected
              })}
              onClick={this.setState.bind(this, {selected: i}, null)}
            >
              <span className="posts_post-title">
                {post.title}
              </span>
              <span className="posts_post-date">
                {moment(post.date).format('MMM Do YYYY')}
              </span>
            </li>
          )
        }
      </ul>
      <div className='posts_display'>
        <Link className='posts_edit-link' to="post" postId={current._id}>edit</Link>
        <div className='posts_content' dangerouslySetInnerHTML={{
          __html: current.content || '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
        }}/>
      </div>
    </div>
  }
});

module.exports = Posts;
