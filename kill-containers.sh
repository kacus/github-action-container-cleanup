if ! docker kill $(docker ps -q) 2>&1 >/dev/null; then
  echo nothing to clean
else
  echo cleaning up after killing containers
  docker system prune --volumes --force
fi
