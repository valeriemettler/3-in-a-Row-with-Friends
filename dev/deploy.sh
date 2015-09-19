#!/usr/bin/env sh
echo "woohoo! we are deploying TEST!!!"
rsync -av --exclude=.git /Users/LOGIN/code/test/* leia:/home/valerie/prj/test
echo ""

