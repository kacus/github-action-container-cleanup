# Fork of [github-action-container-cleanup](https://github.com/waycarbon/github-action-container-cleanup)

**This fork updates action to run in Node20**
[More here](https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20/)

# Original README below

# github-action-container-cleanup

Github Action to cleanup containers created by the lifetime of a workflow Job

## Motivation

For self-hosted runners, there might be job workflows that can potentially launch containers
that will park in certain ports or container names and prevent subsequent runs of the same job
or other jobs that use those ports or names to work.

Moreover, self-hosted runners might well be monitored by solutions such as Prometheus with relies
on exporters such as node-exporter or cadvisor that run on docker containers. Therefore, this
action can't just kill all containers with `docker kill $(docker ps -q)` recklessly.

This action will kill only the containers launched by that specific workflow instantiation.

# How it works

It uses javascript actions in order to support post scripts without relying on containers.

It has two stages, one that lists containers before the workflow run, and another that kills
containers that are not in that first container list.

The lists are saved by the list-containers.sh script, which is invoked by index.js. This
script saves a list of the currently running containers to /tmp/pre-containers-list.txt.

The kill-containers.sh script produces another list with running containers and saves it
to /tmp/post-containers-list.txt. It then takes a difference of the two lists with `comm`
and uses `docker kill` only on the resulting list. If it succeeds in killing containers
it will then execute `docker system prune --force --volumes` to make sure all traces of
the killed containers are purged from the system.

## Example usage

```yml
name: test containers cleanup

on:
  workflow_dispatch:

jobs:
  test-container-cleanup:
    runs-on: self-hosted
    steps:
      - uses: waycarbon/github-action-container-cleanup@v1
      - name: launch nginx container
        run: docker run -d nginx
      - name: launch mysql container
        run: docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql
      - name: introduce workflow error
        run: exit 1
```
