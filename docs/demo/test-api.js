
var Promise = require('es6-promise').Promise
var moment = require('moment')
var render = require('./render')

function newId() {
  var id = ''
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (var i=0; i<10; i++) {
    id += chars[parseInt(Math.random() * chars.length)]
  }
  return id
}

function newPost(title) {
  var slug = title.toLowerCase().replace(/ /g, '-')
  return {
    _id: newId(),
    title: title,
    tags: [],
    categories: [],
    date: new Date().toISOString(),
    content: "",
    source: "_drafts/" + slug + '.md',
    raw: 'title: ' + title + '\n---',
    slug: slug,
    updated: new Date().toISOString(),
    excerpt: '',
    layout: 'post',
    isDraft: true,
    isDiscarded: false,
    path: moment().format('YYYY/MM/DD/') + slug + '/',
  }
}

module.exports = function (config) {
  var ids = {}
  config.posts.forEach((post) => ids[post._id] = post);
  return {
    posts: () => Promise.resolve(config.posts),
    post: (id, data) => {
      if (data) {
        for (var name in data) {
          ids[id][name] = data[name]
        }
        if (data._content) {
          // ids[id].raw = yfm.stringify(ids[id])
          ids[id].content = render({text: data._content})
        }
        return Promise.resolve({post: ids[id], tagsAndCategories: config.tagsAndCategories})
      }
      return Promise.resolve(ids[id])
    },

    newPost: (title) => {
      var post = newPost(title)
      ids[post._id] = post
      config.posts.push(post)
      return Promise.resolve(post)
    },
    uploadImage: (data) => Promise.resolve(null),
    remove: (id) => Promise.resolve(null),
    publish: (id) => {
      ids[id].isDraft = false
      return Promise.resolve(ids[id])
    },
    unpublish: (id) => {
      ids[id].isDraft = true
      return Promise.resolve(ids[id])
    },
    tagsAndCategories: () => Promise.resolve(config.tagsAndCategories),
    settings: () => Promise.resolve(config.settings),
    setSetting: (cat, key, val) => {
      if (!config.settings[cat])
        config.settings[cat] = new Object()
      config.settings[cat][key] = val
      Promise.resolve({
        updated: 'Successfully updated ' + cat + '.' + key + ' = ' + val,
        settings: config.settings
      })
    }
  }
}
