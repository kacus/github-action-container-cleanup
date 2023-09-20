if ! docker kill $(docker ps -q); then
  echo nothing to clean
else
  echo cleaning up after killing containers
  docker system prune --volumes --force
fi
