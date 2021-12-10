#!/bin/sh

FILES=`find . -name '*index.ts' | sort`

for FILE in $FILES
do
  echo "${FILE}"
  ENV=test \
  deno run \
    --allow-read \
    --allow-env \
    --import-map import-map.json \
    "$FILE"
done
