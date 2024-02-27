#!/bin/sh

sed -i "s#http://localhost:5000#$API_URL#g" script.js
npm run dev