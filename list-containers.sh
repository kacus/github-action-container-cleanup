#!/usr/bin/env bash

docker ps -q | sort > /tmp/pre-containers-list.txt
echo containers before job:
cat /tmp/pre-containers-list.txt
