
var request = require('superagent')
var Promise = require('es6-promise').Promise

var baseUrl = '/admin/api'

function post(url, data) {
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

function get(url, params) {
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

module.exports = {
  init: (base) => baseUrl = base,
  posts: () => get('/posts/list'),
  post: (id, data) => {
    if (data) return post('/posts/' + id, data)
    else return get('/posts/' + id)
  },
  newPost: (title) => post('/posts/new', {title: title})
}

