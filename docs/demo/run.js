var admin = require('../../client')
  , api = require('../../client/api')

// for debugging
window.React = require('react')

api.init(require('./test-api.js'), {
  posts: require('./posts.js'),
  tagsAndCategories: require('./tags-and-categories.js'),
  settings: require('./settings.js')
})

document.addEventListener('DOMContentLoaded', () => {
    var node = document.createElement('div')
    document.body.appendChild(node)
    admin(node)
});
