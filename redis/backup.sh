#!/bin/bash

FN="../backup/redis-`date --iso`.json"

node backup.js > $FN

