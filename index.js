var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filter = hexo.extend.filter;
var auth= require('connect-auth');
var strategy = require("./auth");

var path = require('path');
var api = require('./api');

filter.register('server_middleware', function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: "ewrwer"
    }));
    app.use(auth( strategy() ));

    app.use('/admin', function (req, res) {
        req.authenticate(['someName'], function(error, authenticated) {

            serveStatic(path.join(__dirname, 'www'))(req, res);

        });
    });

    app.use('/login/', function (req, res) {

        if (req.method === 'POST') {

            req.authenticate(['someName'], function(error, done) {
                if (done) {
                    res.writeHead(302, { 'Location':  "/admin/" });
                    res.end();
                }
            });

        } else {

            serveStatic(path.join(__dirname, 'auth'))(req, res);

        }

    });


    app.use('/admin/api/', bodyParser.json({limit: '50mb'}));
    api(app);
    //app.use('/admin/', );
});

