#!/bin/bash

FN="redis-`date --iso`.json"
DIR="../backup"
LAST="last.json"

node backup.js > $DIR/$FN
rm -f $DIR/$LAST
ln -s $FN $DIR/$LAST
