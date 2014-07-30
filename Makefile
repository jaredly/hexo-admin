
pages:
	@hexo g && rm -rf /tmp/h-public && cp -r public /tmp/h-public && git checkout gh-pages && git clean -df && cp -r /tmp/h-public/* ./ && git add . && rm -rf /tmp/h-public
