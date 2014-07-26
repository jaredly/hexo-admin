
var path = require('path')

module.exports = function (app) {
  var use = function (path, fn) {
    app.use('/admin/api/' + path, function (req, res) {
      var done = function (val) {
        if (!val) {
          res.statusCode = 204
          return res.end('');
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(val))
      }
      res.done = done
      res.send = function (num, data) {
        res.statusCode = num
        res.end(data)
      }
      fn(req, res)
    })
  }
  use('posts/list', function (req, res) {
   var post = hexo.model('Post')
   res.done(post.toArray());
  });
  use('posts/update/', function (req, res) {
    var id = req.url.split('/').slice(-2)[0]
    if (!req.body) {
      return res.send(400, 'No post body given');
    }
    hexo.post.update(id, req.body, function (err, post) {
      if (err) {
        return res.send(400, err);
      }
      res.done(post)
    });
  });
  use('posts/', function (req, res, next) {
    var id = req.url.split('/').slice(-2)[0]
    if (id === 'posts' || !id) return next()
    if (req.method === 'POST') {
      // deal
      if (!req.body) {
        return res.send(400, 'No post body given');
      }
      hexo.post.update(id, req.body, function (err, post) {
        if (err) {
          return res.send(400, err);
        }
        res.done(post)
      });
      return
    }
    return res.done(hexo.model('Post').get(id))
  });
}

