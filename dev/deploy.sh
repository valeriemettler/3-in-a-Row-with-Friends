#!/usr/bin/env sh
echo "woohoo! we are deploying TICTACTOE!!!"
rsync -av --exclude=.git /Users/LOGIN/code/tictactoe/* leia:/home/valerie/prj/tictactoe
echo ""

