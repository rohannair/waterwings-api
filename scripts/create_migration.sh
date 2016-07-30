#!/bin/bash
name=$1
if [[ -n "$name" ]]; then
  touch ./migrations/$(echo $(date +%s))-$name-migration.sql
else
  touch ./migrations/$(echo $(date +%s))-$(cat .git/refs/heads/master)-migration.sql
fi
