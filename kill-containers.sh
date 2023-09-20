#!/usr/bin/env bash

docker ps -q | sort > /tmp/post-containers-list.txt
containers_to_kill=$(comm -23 /tmp/post-containers-list.txt /tmp/pre-containers-list.txt)

if ! docker kill $containers_to_kill 2>&1 >/dev/null; then
  echo nothing to clean
else
  echo cleaning up after killing containers
  docker system prune --volumes --force
fi

rm -f /tmp/post-containres-list.txt /tmp/pre-containers-list.txt
