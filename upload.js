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
  function uploadFile(uptoken, key, localFile, done) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(ret){
        ret.url = 'http://' + C.qiniu.bucket + '.qiniudn.com/'+ ret.key;
      }
      done(err, ret)
    });
  }

  function syncQiniu(filename,filepath, done){
    //生成上传 Token
    var token = uptoken(filename);
    //调用uploadFile上传
    uploadFile(token, filename, filepath, done);
  }

  return {
    upload: function(filename, filepath, done ) {
      syncQiniu(filename, filepath, done)
    }
  };
}
