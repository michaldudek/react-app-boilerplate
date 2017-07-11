.PHONY: clear build

clear:
	rm -rf web/dist

build: clear
	./node_modules/.bin/webpack --config build/js/webpack.config.js

dev: clear
	NODE_ENV=development node src/server.js

start: clear
	NODE_ENV=production node src/server.js
