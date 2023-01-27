#!/bin/sh
npm i &&
npx webpack --env mode=production port=3000 apiUrl=app:4000