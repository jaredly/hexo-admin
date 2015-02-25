var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var filter = hexo.extend.filter;

var path = require('path')

var api = require('./api');

var passwordProtected = hexo.config.admin && hexo.config.admin.username;

// verify that correct config options are set.
if (passwordProtected) {
    if (!hexo.config.admin.password_hash) {
        console.error('[Hexo Admin]: config admin.password_hash is requred for authentication')
        passwordProtected = false
    }
    if (!hexo.config.admin.secret) {
        console.error('[Hexo Admin]: config admin.secret is requred for authentication')
        passwordProtected = false
    }
}

filter.register('server_middleware', function (app) {

    if (passwordProtected) {
        // setup authentication, login page, etc.
        require('./auth')(app)
    }

    app.use('/admin/', serveStatic(path.join(__dirname, 'www')));
    app.use('/admin/api/', bodyParser.json({limit: '50mb'}))
    // setup the json api endpoints
    api(app);
});

