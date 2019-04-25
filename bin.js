#!/usr/bin/env node

var JSONStream = require('JSONStream')
var argv = require('subarg')(process.argv.slice(2))
var transform = require('.')

if (argv._.length < 1) {
  console.log('usage: deps-transform <transform-name>')
  process.exit(1)
}

process.stdin
  .pipe(JSONStream.parse([ true ]))
  .pipe(transform(argv._[0], argv))
  .pipe(JSONStream.stringify())
  .pipe(process.stdout)
