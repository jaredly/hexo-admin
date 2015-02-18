var md5 = require("MD5");

module.exports= function() {
    this.name = "someName";

    function failed_validation( request, response, uri ) {
        var redirectUrl= "/login/";
        response.writeHead(303, { 'Location':  redirectUrl });
        response.end();
    }

    function validate_credentials( executionScope, request, response, callback ) {
        if( request.body.login == hexo.config.login && md5(request.body.password) == hexo.config.password ) {
            executionScope.success( {name:request.body.user}, callback )
        }
        else {
            executionScope.fail( callback )
        }
    }

    this.authenticate= function(request, response, callback) {

        if( request.body && request.body.login && request.body.password ) {
            validate_credentials( this, request, response, callback );
        }
        else {
            failed_validation( request, response, request.url );
        }
    };

    return this;
};