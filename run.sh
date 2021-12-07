
#!/bin/sh

FILES=`find . -name '*index.ts' | sort`

for FILE in $FILES
do
  echo "${FILE}"
  deno run \
    --allow-read \
    --import-map import-map.json \
    "$FILE"
done
