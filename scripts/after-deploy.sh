#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo /usr/local/bin/yarn

sudo /usr/local/bin/pm2 start yarn --name "nextjs" --interpreter bash -- start