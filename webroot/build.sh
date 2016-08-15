#!/bin/sh
echo Updating Bower components...
rm -rf components
bower install
echo Copying files...
ln -s /usr/local/lib/node_modules/ node_modules
grunt
rm node_modules
rm -rf components
