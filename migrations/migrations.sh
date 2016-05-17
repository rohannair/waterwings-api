#!/bin/bash

dbhost=$1
db=$2
dbuser=$3

if [ x == x$PGPASSWORD -o x == x$dbhost -o x == x$db -o x == x$dbuser ]
then
  echo Usage: $0 dbhost db dbuser
  echo Also, please set PGPASSWORD and rerun this utility
  exit 1
fi

for f in $(ls migrations/*.sql | sort -n)
do
  psql -h $dbhost -p 5432 -d $db -U $dbuser -f $f
done
