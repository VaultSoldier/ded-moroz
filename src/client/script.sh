#!/bin/bash

sed -i 's|"__API_URL__"|'"$API_URL"'|g' script.js

npm run dev