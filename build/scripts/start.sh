#!/bin/bash
set -ex

# run nginx in background
nginx

# run the node app in foreground so it becomes PID 1
# and if it crashes then container should get restarted
node dist/server.js
