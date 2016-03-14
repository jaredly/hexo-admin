
BROWS=-t [ reactify --es6 --everything ] client/run.js -o www/bundle.js -d

build:
	@browserify ${BROWS}

watch:
	@./node_modules/.bin/watchify -v ${BROWS}

less:
	@lessc client/less/index.less www/bundle.css

watch-less:
	@watch make less

demo:
	@cd docs/demo && browserify -t [ reactify --es6 --everything ] run.js -o admin/bundle.js -d

pages: build less demo
	@rm -rf /tmp/h-admin && cp -r docs/demo/admin /tmp/h-admin && git co gh-pages && rm -rf admin && mv /tmp/h-admin ./admin

.PHONY: build watch less
