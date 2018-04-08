/**
 * This enables authentication for the admin pages.
 * All paths starting with /admin/ are protected by cookie-based login, where
 * username must match `admin.username` and the password's bcrypt hash must match
 * `admin.password_hash`.
 * If the admin.protect_all config setting is present, the entire hexo site will
 * be protected.
 */

var cookieParser = require('cookie-parser')
  , serveStatic = require('serve-static')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , auth = require('connect-auth')
  , path = require('path')
  , authStrategy = require('./strategy')

module.exports = function (app, hexo) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: hexo.config.admin.secret
  }));

  var protectPattern = hexo.config.root + 'admin';
  if(hexo.config.admin.protect_all)
    protectPattern = hexo.config.root;
  app.use(protectPattern, auth(new authStrategy(hexo)));

  app.use(hexo.config.root + 'admin/login', function (req, res) {
      if (req.method === 'POST') {
          req.authenticate(['adminAuth'], function(error, done) {
              if (done) {
                  res.writeHead(302, { 'Location':  hexo.config.root + "admin/" });
                  res.end();
              }
          });
      } else {
          serveStatic(path.join(__dirname, '../www', 'login'))(req, res);
      }
  });

  app.use(protectPattern, function (req, res, next) {
      req.authenticate(['adminAuth'], next)
  });
}
