## Base Hexo-Admin

This is an hexo plugin based on [HEXO-ADMIN](https://github.com/jaredly/hexo-admin) .

## Hexo Version

For 2.x, use version `0.3.0` of this plugin. Version `1.x` and beyond only
support Hexo v3.x.

### Contents
- [**Screenshots**](#screenshots)
- [**Qiniu Support**](#qiniu)
- [**Quickstart**](#quickstart)
- [**Credits**](#credits)

# Screenshots

![login](http://olk3bzfd5.bkt.clouddn.com/pasted-1487403495592.png)

![edit](http://olk3bzfd5.bkt.clouddn.com/pasted-1487403530943.png)

# Quickstart
### 1. Setup hexo & create a blog
```sh
npm install -g hexo
cd ~/
hexo init my-blog
cd my-blog
npm install
```
### 2. Install the admin & start things up
```sh
npm install --save hexo-admin-yf
hexo server -d
open http://localhost:4000/admin/
```

### 3. Password protection
If you're using Hexo admin on your live server, you want some password
protection. To enable this, you just add a few config variables to your hexo
`_config.yml`:

```
admin:
  username: myfavoritename
  password_hash: be121740bf988b2225a313fa1f107ca1
  secret: a secret something
```

The `password_hash` is the bcrypt hash of your password. The `secret` is used
to make the cookies secure, so it's a good idea to have it be long and
complicated.

A utility in Hexo admin's Settings can hash your password and generate the `admin`
section for you. Start Hexo and go to `Settings > Setup authentification`
and fill out your information. Copy the generated YAML into your `_config.yml`.

Once that's in place, start up your hexo server and going to `/admin/` will
require you to enter your password.

### 4. Custom post metadata
To add and edit your own post metadata with the admin interface, add the
metadata variable and your custom variables to your hexo `_config.yml`:
```
metadata:
  author_id: defaultAuthorId
  language:
```
You can provide default values that will be used to initialize the metadata
of a new post.

### 5. Contribute!
- let me know how it can be improved in the [github
  issues](https://github.com/yfsoftcom/hexo-admin-yf/issues)
- [fork](https://github.com/yfsoftcom/hexo-admin-yf) and pull-request

# Qiniu Support!

Get Your Qiniu Keys:

![upload successful](http://olk3bzfd5.bkt.clouddn.com/pasted-1487403384624.png)

Get Your Qiniu Test Domain And Bucket:

![upload successful](http://olk3bzfd5.bkt.clouddn.com/pasted-1487403438509.png)
To Support Qiniu, add the qiniu variable to your hexo
`_config.yml`:
```
qiniu:
  bucket: [your qiniu bucket key here]
  domain: [your qiniu outlink domain here]
  ACCESS_KEY: [your qiniu access key here]
  SECRET_KEY: [your qiniu secret key here]
```

# Credits

built with ❤ by [Wang Fan](http://blog.yfsoft.biz)
([@yunplus.io](http://blog.yunplus.io)) using
[react](http://facebook.github.io/react), [browserify](
http://browserify.org), and [less](http://lesscss.org).
