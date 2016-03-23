var bcrypt = require("bcrypt-nodejs");

module.exports = function (hexo) {
    this.name = "adminAuth";

    function failed_validation( request, response ) {
        var redirectUrl= hexo.config.root+"admin/login";
        response.writeHead(303, { 'Location':  redirectUrl });
        response.end();
    }

    function validate_credentials( executionScope, request, response, callback ) {
        var config = hexo.config.admin
        if (request.body.username == config.username &&
            bcrypt.compareSync(request.body.password, config.password_hash)) {
            executionScope.success({name:request.body.user}, callback)
        }
        else {
            failed_validation(request, response);
        }
    }

    this.authenticate = function(request, response, callback) {
        if (request.body && request.body.username && request.body.password ) {
            validate_credentials( this, request, response, callback );
        }
        else {
            failed_validation( request, response, request.url );
        }
    };

    return this;
};
