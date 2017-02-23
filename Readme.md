![logo](docs/logo.png?raw=true)

An admin UI for the [Hexo blog engine](http://hexo.io). Based off of the [Ghost](http://ghost.org) interface, with inspiration from [svbtle](http://svbtle.com) and [prose.io](http://prose.io).

## Hexo Version

For 2.x, use version `0.3.0` of this plugin. Version `1.x` and beyond only
support Hexo v3.x.

### Contents
- [**Screenshots**](#screenshots)
- [**Quickstart**](#quickstart)
- [**Credits**](#credits)

# Local use vs deployment
This plugin was originally designed as a local editor -- you run hexo locally, use `hexo-admin` to author posts, and then use `hexo generate` or `hexo deploy` to send the generated static HTML files up to github pages or some other static server.

However, `hexo-admin` can be run on your live blog, as long as you're using a non-static hosting service such as Heroku, DigitalOcean, etc. Static hosting services such as Github pages and Surge.sh does not support running hexo-admin from your live site.
If you're using Hexo admin from your live blog, you should definitely set up a password (see below) -- otherwise anyone will be able to edit your content.

# Screenshots
![posts view](docs/pasted-0.png?raw=true)

![editor view](docs/pasted-1.png?raw=true)

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
npm install --save hexo-admin
hexo server -d
open http://localhost:4000/admin/
```
### 3. Profit!
The UI should be pretty discoverable -- let me know if you can't find something.

### 4. Password protection
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

### 5. Custom post metadata
To add and edit your own post metadata with the admin interface, add the
metadata variable and your custom variables to your hexo `_config.yml`:
```
metadata:
  author_id: defaultAuthorId
  language:
```
You can provide default values that will be used to initialize the metadata
of a new post.

### 6. Contribute!
- let me know how it can be improved in the [github
  issues](https://github.com/jaredly/hexo-admin/issues)
- [fork](https://github.com/jaredly/hexo-admin) and pull-request

# Credits

built with ❤ by [Jared Forsyth](http://jaredly.github.io)
([@jaredforsyth](http://twitter.com/jaredforsyth)) using
[react](http://facebook.github.io/react), [browserify](
http://browserify.org), and [less](http://lesscss.org).
