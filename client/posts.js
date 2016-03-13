import { browserHistory, Link } from 'react-router';
var React = require('react');
var cx = require('classnames');
var _ = require('lodash');
var moment = require('moment');
var SinceWhen = require('./since-when');

var Rendered = require('./rendered');
var DataFetcher = require('./data-fetcher');
var NewPost = require('./new-post');
var api = require('./api');

var Posts = React.createClass({
  mixins: [DataFetcher((params) => {
    return {
      posts: api.posts().then((posts) =>
        _.sortBy(posts, ['isDraft', 'date']).reverse()
      )
    }
  })],

  getInitialState: function () {
    return {
      selected: 0
    }
  },

  _onNew: function (post) {
    var posts = this.state.posts.slice();
    posts.unshift(post);
    this.setState({posts: posts});
    browserHistory.push('/admin/#/posts/' + post._id);
  },

  goTo: function (id, e) {
    if (e) {
      e.preventDefault();
    }
    browserHistory.push('/admin/#/posts/' + id);
  },

  render: function () {
    if (!this.state.posts) {
      return <div className='posts'>Loading...</div>
    }
    var current = this.state.posts[this.state.selected] || {}
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
              {!post.isDraft && <a className='posts_perma-link' target="_blank" href={'/' + post.path}>
                <i className='fa fa-link'/>
              </a>}
              <Link className='posts_edit-link' to={`/posts/${post._id}`}>
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