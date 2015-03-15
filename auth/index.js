/**
 * This enables authentication for the admin pages.
 * All paths starting with /admin/ are protected by cookie-based login, where
 * username must match `admin.username` and the password's md5 hash must match
 * `admin.md5_password`.
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
  app.use(auth(authStrategy(hexo)));
  app.use('/admin/login', function (req, res) {
      if (req.method === 'POST') {
          req.authenticate(['adminAuth'], function(error, done) {
              if (done) {
                  res.writeHead(302, { 'Location':  "/admin/" });
                  res.end();
              }
          });
      } else {
          serveStatic(path.join(__dirname, '../www', 'login'))(req, res);
      }
  });
  app.use('/admin/', function (req, res, next) {
      req.authenticate(['adminAuth'], next)
  });
}
