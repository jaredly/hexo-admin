
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

  use('posts/new', function (req, res, next) {
    if (req.method !== 'POST') return next()
    if (!req.body) {
      return res.send(400, 'No post body given');
    }
    if (!req.body.title) {
      return res.send(400, 'No title given');
    }

    hexo.post.create({title: req.body.title}, function (err, filename, content) {
      if (err) {
        console.error(err, err.stack)
        return res.send(500, 'Failed to create post')
      }

      var source = filename.slice(hexo.source_dir.length)
      hexo.source.process([source], function () {
        var post = hexo.model('Post').findOne({source: source})
        res.done(post);
      });
    });
  });

  use('posts/', function (req, res, next) {
    var url = req.url
    if (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }

    var id = url.split('/').slice(-1)[0]
    if (id === 'posts' || !id) return next()
    if (req.method === 'GET') {
      var post = hexo.model('Post').get(id)
      if (!post) return next()
      return res.done(post)
    }

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
}

