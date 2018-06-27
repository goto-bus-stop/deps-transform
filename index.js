var fromString = require('from2-string')
var concat = require('concat-stream')
var through = require('through2')
var resolve = require('resolve')
var pump = require('pump')

module.exports = function depsTransform (transformName, opts) {
  var basedir = process.cwd()
  var transformPath = resolve.sync(transformName, { basedir: basedir })
  var transform = require(transformPath)

  return through.obj(onrow)

  function onrow (row, enc, next) {
    pump(
      fromString(row.source),
      transform(row.file || row.id + '.js', opts),
      concat({ encoding: 'string' }, function (source) {
        row.source = source
        next(null, row)
      }),
      function (err) {
        if (err) next(err)
      }
    )
  }
}
