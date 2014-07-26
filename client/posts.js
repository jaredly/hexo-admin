
var Link = require('react-router').Link;
var DataFetcher = require('./data-fetcher');
var api = require('./api');
var React = require('react/addons')
var cx = React.addons.classSet

var Posts = React.createClass({
  mixins: [DataFetcher({
    fetch: () => api.posts()
  })],

  getInitialState: function () {
    return {
      selected: 0
    }
  },

  render: function () {
    if (!this.state.data) {
      return <div className='posts'>Loading...</div>
    }
    var current = this.state.data[this.state.selected] || {}
    return <div className="posts">
      <ul className='posts_list'>
        {
          this.state.data.map((post, i) => 
            <li key={post._id} className={cx({
                "posts_post": true,
                "posts_post--selected": i === this.state.selected
              })}
              onClick={this.setState.bind(this, {selected: i}, null)}
            >
              {post.title}
            </li>
          )
        }
      </ul>
      <div className='posts_display'>
        <Link className='posts_edit-link' to="post" postId={current._id}>edit</Link>
        <div className='posts_content' dangerouslySetInnerHTML={{
          __html: current.content || 'Hi'
        }}/>
      </div>
    </div>
  }
});

module.exports = Posts;
