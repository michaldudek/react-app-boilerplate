.PHONY: start dev build clear clear_client clear_server client client_dev server server_dev

# MAIN ENTRY POINTS
start:
	NODE_ENV=production node dist/server.js

dev: server_dev
	NODE_ENV=development node dist/server.js

build: client server

clear: clear_client clear_server

test:
	@echo "No tests"

# BUILDING
clear_client:
	rm -rf web/dist

clear_server:
	rm -rf dist/

client: clear_client
	NODE_ENV=production TARGET=client ./node_modules/.bin/webpack --config build/webpack.config.js

client_dev: clear_client
	NODE_ENV=development TARGET=client ./node_modules/.bin/webpack --config build/webpack.config.js

server: clear_server
	NODE_ENV=production TARGET=server ./node_modules/.bin/webpack --config build/webpack.config.js

server_dev: clear_server
	NODE_ENV=development TARGET=server ./node_modules/.bin/webpack --config build/webpack.config.js

