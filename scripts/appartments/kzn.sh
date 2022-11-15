#!/bin/bash
cd ../..
git stash
git pull origin main
git stash apply
yarn
yarn pm2:start kzn-appart
