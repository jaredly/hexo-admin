var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var filter = hexo.extend.filter;
var url = require("url");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("check user", arguments);
        done();
    }
));

var path = require('path')

var api = require('./api');

filter.register('server_middleware', function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, res, next) {

        var paths = url.parse(req.url).pathname.split("/");
        if (paths[1] === 'admin' && req.method === 'GET') {
            if (req.isAuthenticated()) { return next(); }

            res.end('<html><form action="/admin/" method="post"><input name="login"/><input name="password"/></form></html>');

        } else {
            next();
        }

    });

    app.post('/admin/',
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        function(req, res) {
            res.redirect('/admin/');
        });

    app.use('/admin/api/', bodyParser.json({limit: '50mb'}))
    api(app);
    app.use('/admin/', serveStatic(path.join(__dirname, 'www')));
});

