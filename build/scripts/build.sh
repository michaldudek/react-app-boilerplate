#!/bin/bash
set -ex

# Install system dependencies
apk --update add nginx wget curl bash make

# cleanup
apk del build-base
rm -fr /var/cache/apk/*
rm -fr /tmp/*
