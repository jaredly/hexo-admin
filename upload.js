var qiniu = require("qiniu");

module.exports = function(options){
  var C = {
    qiniu: options
  };
  qiniu.conf.ACCESS_KEY = C.qiniu.ACCESS_KEY;
  qiniu.conf.SECRET_KEY = C.qiniu.SECRET_KEY;
  //构建上传策略函数
  function uptoken( key) {
      var putPolicy = new qiniu.rs.PutPolicy(C.qiniu.bucket+":"+key);
      return putPolicy.token();
  }

  //构造上传函数
  function uploadFile(uptoken, key,  body, done) {
    var extra = new qiniu.io.PutExtra();
    // extra.mimeType = 'image/png';
    qiniu.io.putFile(uptoken,key, body, extra, function(err, ret) {
      if(ret){
        if(ret.code){
          done(ret);
          return;
        }
        ret.url = 'http://' + C.qiniu.domain + '/'+ ret.key;
      }
      if(err)
        console.log(err)
      console.log(ret)
      done(err, ret)
    });
  }

  function syncQiniu(filename, data, done){
    //生成上传 Token
    var token = uptoken(filename);
    //调用uploadFile上传
    uploadFile(token, filename, data, done);
  }

  return {
    upload: function(filename, data, done ) {
      syncQiniu(filename, data, done)
    }
  };
}
