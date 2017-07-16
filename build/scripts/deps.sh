#!/bin/bash
set -ex

# only install npm if not on local
if [[ "$VERSION" != "local" ]]; then
    echo "Installing npm dependencies for production (${VERSION})..."
    make deps
else
    echo "Local image, not installing npm dependencies."
fi
