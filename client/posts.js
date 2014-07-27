
var React = require('react/addons')
var cx = React.addons.classSet
var Link = require('react-router').Link;
var Router = require('react-router');
var _ = require('lodash')
var moment = require('moment')
var SinceWhen = require('./since-when')

var DataFetcher = require('./data-fetcher');
var NewPost = require('./new-post')
var api = require('./api');

var Posts = React.createClass({
  mixins: [DataFetcher({
    fetch: () => api.posts().then((data) => 
      _.sortBy(data, ['isDraft', 'date']).reverse()
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

  goTo: function (id, e) {
    if (e) {
      e.preventDefault()
    }
    Router.transitionTo('post', {postId: id})
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
        <div className='posts_content' dangerouslySetInnerHTML={{
          __html: current.content || '<h1 class="editor_no-content">There doesn\'t seem to be anything here</h1>'
        }}/>
      </div>
    </div>
  }
});

module.exports = Posts;
