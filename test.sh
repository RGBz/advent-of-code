#!/bin/sh

ENV=test \
deno test \
  --allow-net \
  --allow-read \
  --allow-env \
  --import-map import-map.json