#!/bin/bash

# 注意：绝对路径耦合
# - install_jekyll.sh
# - isc_site_auto_ci.service
# - auto_sync.sh

cd /workspaces/isc_site

while :; do
    sleep  5s
    echo "five secnd passed."
    
    git pull

    bundle
    jekyll build --incremental

    echo $(date) > TIMESTAMP.txt
done
