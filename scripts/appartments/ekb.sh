#!/bin/bash
cd ../..
git stash
git pull origin main
git stash apply
yarn
yarn start appartments-bot-ekb
