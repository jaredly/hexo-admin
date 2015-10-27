
var request = require('superagent')
var Promise = require('es6-promise').Promise

function _post(baseUrl, url, data) {
  return new Promise((f, r) => {
    var req = request.post(baseUrl + url)
    if (data) {
      req = req.send(data)
    }
    req.end((err, res) => {
      if (err) return r(err)
      f(res.body)
    })
  })
}

function _get(baseUrl, url, params) {
  return new Promise((f, r) => {
    var req = request.get(baseUrl + url)
    if (params) {
      req = req.query(params)
    }
    req.end((err, res) => {
      if (err) return r(err)
      f(res.body)
    })
  })
}

module.exports = function (baseUrl) {
  var post = _post.bind(null, baseUrl)
  var get = _get.bind(null, baseUrl)

  return {
    posts: () => get('/posts/list'),
    post: (id, data) => {
      if (data) return post('/posts/' + id, data)
      return get('/posts/' + id)
    },
    newPost: (title) => post('/posts/new', {title: title}),
    pages: () => get('/pages/list'),
    page: (id, data) => {
      if (data) return post('/pages/' + id, data)
      return get('/pages/' + id)
    },
    deploy: (message) => post('/deploy', {message: message}),
    newPage: (title) => post('/pages/new', {title: title}),
    uploadImage: (data) => post('/images/upload', {data: data}),
    remove: (id) => post('/posts/' + id + '/remove'),
    publish: (id) => post('/posts/' + id + '/publish'),
    unpublish: (id) => post('/posts/' + id + '/unpublish'),
    tagsAndCategories: () => get('/tags-and-categories'),
  }
}

