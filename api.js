
var path = require('path')
var fs = require('fs')
var update = require('./update')

function addIsDraft(post) {
  post.isDraft = post.source.indexOf('_draft') === 0
  post.isDiscarded = post.source.indexOf('_discarded') === 0
  return post
}

function tagsAndCategories() {
  var cats = {}
    , tags = {}
  hexo.model('Category').forEach(function (cat) {
    cats[cat._id] = cat.name
  })
  hexo.model('Tag').forEach(function (tag) {
    tags[tag._id] = tag.name
  })
  return {
    categories: cats,
    tags: tags
  }
}

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

  use('tags-and-categories', function (req, res) {
    res.done(tagsAndCategories())
  })

  use('posts/list', function (req, res) {
   var post = hexo.model('Post')
   res.done(post.toArray().map(addIsDraft));
  });

  use('posts/new', function (req, res, next) {
    if (req.method !== 'POST') return next()
    if (!req.body) {
      return res.send(400, 'No post body given');
    }
    if (!req.body.title) {
      return res.send(400, 'No title given');
    }

    hexo.post.create({title: req.body.title, layout: 'draft', date: new Date()}, function (err, filename, content) {
      if (err) {
        console.error(err, err.stack)
        return res.send(500, 'Failed to create post')
      }

      var source = filename.slice(hexo.source_dir.length)
      hexo.source.process([source], function () {
        var post = hexo.model('Post').findOne({source: source})
        res.done(addIsDraft(post));
      });
    });
  });

  use('posts/', function (req, res, next) {
    var url = req.url
    if (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }
    var parts = url.split('/')
    var last = parts[parts.length-1]
    if (last === 'publish') {
      return publish(parts[parts.length-2], req.body, res)
    }
    if (last === 'unpublish') {
      return unpublish(parts[parts.length-2], req.body, res)
    }
    if (last === 'remove') {
      return remove(parts[parts.length-2], req.body, res)
    }

    var id = last
    if (id === 'posts' || !id) return next()
    if (req.method === 'GET') {
      var post = hexo.model('Post').get(id)
      if (!post) return next()
      return res.done(addIsDraft(post))
    }

    if (!req.body) {
      return res.send(400, 'No post body given');
    }

    update(id, req.body, function (err, post) {
      if (err) {
        return res.send(400, err);
      }
      res.done({
        post: addIsDraft(post),
        tagsAndCategories: tagsAndCategories()
      })
    });
  });

  use('images/upload', function (req, res, next) {
    if (req.method !== 'POST') return next()
    if (!req.body) {
      return res.send(400, 'No post body given');
    }
    if (!req.body.data) {
      return res.send(400, 'No data given');
    }
    var i = 0
    while (fs.existsSync(hexo.source_dir + 'images/pasted-' + i + '.png')) {
      i +=1
    }
    var filename = 'images/pasted-' + i + '.png'
    var outpath = hexo.source_dir + filename

    var dataURI = req.body.data.slice('data:image/png;base64,'.length)
    var buf = new Buffer(dataURI, 'base64')
    fs.writeFile(outpath, buf, function (err) {
      if (err) {
        console.log(err)
      }
      hexo.source.process([filename], function () {
        res.done('/' + filename)
      });
    })
  })
}

function remove(id, body, res) {
  var post = hexo.model('Post').get(id)
  if (!post) return res.send(404, "Post not found")
  var newSource = '_discarded/' + post.source.slice('_drafts/'.length)
  update(id, {source: newSource}, function (err, post) {
    if (err) {
      return res.send(400, err);
    }
    res.done(addIsDraft(post))
  })
}

function publish(id, body, res) {
  var post = hexo.model('Post').get(id)
  if (!post) return res.send(404, "Post not found")
  var newSource = '_posts/' + post.source.slice('_drafts/'.length)
  update(id, {source: newSource}, function (err, post) {
    if (err) {
      return res.send(400, err);
    }
    res.done(addIsDraft(post))
  })
}

function unpublish(id, body, res) {
  var post = hexo.model('Post').get(id)
  if (!post) return res.send(404, "Post not found")
  var newSource = '_drafts/' + post.source.slice('_posts/'.length)
  update(id, {source: newSource}, function (err, post) {
    if (err) {
      return res.send(400, err);
    }
    res.done(addIsDraft(post))
  })
}

