#!/bin/sh
echo Updating Bower components...
rm -rf components
bower install
echo Copying files...
npm install
grunt
rm -rf node_modules
rm -rf components
