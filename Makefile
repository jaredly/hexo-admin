
BROWS=-t [ reactify --es6 --everything ] client/run.js -o www/bundle.js -d

build:
	@browserify ${BROWS}

watch:
	@watchify -v ${BROWS}

less:
	@lessc client/less/index.less www/bundle.css

watch-less:
	@watch make less

.PHONY: build watch less
