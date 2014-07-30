![logo](docs/logo.png?raw=true)

An admin UI for the [Hexo blog engine](http://hexo.io). Based off of the [Ghost](http://ghost.org) interface, with inspiration from [svbtle](http://svbtle.com) and [prose.io](http://prose.io).

### Contents
- [**Screenshots**](#screenshots)
- [**Quickstart**](#quickstart)
- [**Credits**](#credits)

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
npm install --save hexo-admin-plugin
hexo server -d
open http://localhost:4000/admin/
```
### 3. Profit!
The UI should be pretty discoverable -- let me know if you can't find something.

### 4. Contribute!
- let me know how it can be improved in the [github issues](https://github.com/jaredly/hexo-admin/issues)
- [fork](https://github.com/jaredly/hexo-admin) and pull-request

# Credits

built with ❤ by [Jared Forsyth](http://jaredly.github.io) ([@jaredforsyth](http://twitter.com/jaredforsyth)) using [react](http://facebook.github.io/react), [browserify](
http://browserify.org), and [less](http://lesscss.org).
