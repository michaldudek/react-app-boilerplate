.PHONY: start dev build image clear clear_client clear_server client client_dev server server_dev

IMAGE_NAME=palysanddudek/react-app
VERSION?=local

# MAIN ENTRY POINTS
start: image
	@docker-compose up -d

stop:
	@docker-compose stop

dev: server_dev
	NODE_ENV=development node dist/server.js

build: client server

clear: clear_client clear_server

test:
	@echo "No tests"

image:
	$(info Creating Docker image - ${VERSION})
	@docker build \
		-t ${IMAGE_NAME}:${VERSION} \
		-f build/Dockerfile \
		--build-arg VERSION=${VERSION} \
		.

# BUILDING
deps:
	npm install

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

