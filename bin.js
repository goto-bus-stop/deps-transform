#!/usr/bin/env node

var json = require('jsonstream2')
var argv = require('subarg')(process.argv.slice(2))
var transform = require('.')

if (argv._.length < 1) {
  console.log('usage: deps-transform <transform-name>')
  process.exit(1)
}

process.stdin
  .pipe(json.parse([ true ]))
  .pipe(transform(argv._[0], argv))
  .pipe(json.stringify())
  .pipe(process.stdout)
