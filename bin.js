#!/usr/bin/env node

var JSONStream = require('JSONStream')
var argv = require('subarg')(process.argv.slice(2))
var transform = require('.')

process.stdin
  .pipe(JSONStream.parse([ true ]))
  .pipe(transform(argv._[0], argv))
  .pipe(JSONStream.stringify())
  .pipe(process.stdout)
