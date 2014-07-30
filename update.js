var fs = require('fs'),
  path = require('path'),
  moment = require('moment'),
  util = hexo.util,
  file = util.file2,
  yfm = util.yfm,
  escape = util.escape;

/**
 * Updates a post.
 *
 * @method update
 * @param {Object} post a post model
 * @param {Object} update attributes to update
 * @param {Function} callback
 */
module.exports = function (id, update, callback) {
  var post = hexo.model('Post').get(id)
  if (!post) {
    return callback('Post not found');
  }
  var config = hexo.config,
    slug = post.slug = escape.filename(post.slug || post.title, config.filename_case),
    layout = post.layout = (post.layout || config.default_layout).toLowerCase(),
    date = post.date = post.date ? moment(post.date) : moment();

  var split = yfm.split(post.raw),
    frontMatter = split.data
    compiled = yfm([frontMatter, '---', split.content].join('\n'));

  var preservedKeys = ['title', 'date', 'tags', 'categories', '_content'];
  var prev_full = post.full_source;

  if (update.source && update.source !== post.source) {
    update.full_source = hexo.source_dir + update.source
  }

  preservedKeys.forEach(function (attr) {
    if (attr in update) {
      compiled[attr] = update[attr]
    }
  });
  compiled.date = moment(compiled.date).toDate()

  delete update._content

  var raw = yfm.stringify(compiled);
  update.raw = raw
  update.updated = moment()
  for (var name in update) {
    post[name] = update[name];
  }
  console.log(prev_full, post.source)
  post.save(function () {
    console.log(post.full_source, post.source)
    file.writeFile(post.full_source, raw, function(err){
      if (err) return callback(err);

      if (post.full_source !== prev_full) {
        fs.unlinkSync(prev_full)
      }
      hexo.source.process([post.source], function () {
        console.log(post.full_source, post.source)
        callback(null, hexo.model('Post').get(id));
      });
    });
  });
}

