.PHONY: clear build

clear:
	rm -rf web/dist

build: clear
	./node_modules/.bin/webpack --config build/js/webpack.config.js
