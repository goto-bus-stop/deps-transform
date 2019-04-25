var test = require('tape')
var path = require('path')
var mdeps = require('module-deps')
var sort = require('deps-sort')
var transform = require('..')
var uglifyify = require('uglifyify')
var concat = require('concat-stream')
var scream = require('scream-stream')

test('browserify transforms + options', function (t) {
  t.plan(3)

  var deps = mdeps()
  deps
    .pipe(sort())
    .pipe(transform(uglifyify, { sourceMap: false, toplevel: true }))
    .pipe(concat(function (res) {
      t.equal(res[0].source, 'console.log("whatever");')
      t.equal(res[1].source, 'exports.c=4;')
      t.equal(res[2].source, 'require("./dep"),require("./dep2");')
    }))

  deps.end({ file: path.join(__dirname, 'files/main.js') })
})

test('browserify transform function', function (t) {
  t.plan(3)

  var deps = mdeps()
  deps
    .pipe(sort())
    .pipe(transform(scream))
    .pipe(concat(function (res) {
      t.equal(res[0].source, 'CONSOLE.LOG(\'WHATEVER\')\n')
      t.equal(res[1].source, 'VAR A = 1\nVAR B = 2\nEXPORTS.C = A * B * A * B\n')
      t.equal(res[2].source, 'REQUIRE(\'./DEP\')\nREQUIRE(\'./DEP2\')\n')
    }))

  deps.end({ file: path.join(__dirname, 'files/main.js') })
})
