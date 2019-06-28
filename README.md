# deps-transform

run browserify transforms on a module-deps stream

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/deps-transform.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/deps-transform
[travis-image]: https://img.shields.io/travis/com/goto-bus-stop/deps-transform.svg?style=flat-square
[travis-url]: https://travis-ci.com/goto-bus-stop/deps-transform
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```bash
npm install deps-transform
```

## Usage

Use it to apply transforms after the 'deps' stage in the browserify pipeline:

```js
// minify JUST before packing
b.pipeline.get('pack').unshift(
  transform('uglifyify'))
```

You can use it to apply transforms on a preexisting bundle:

```bash
# extract modules from bundle.js,
# format them nicely using babel-preset-unminify,
# save in the out/ folder.
browser-unpack < bundle.js | \
  deps-transform babelify --presets [ unminify ] | \
  deps-write out
```

Perhaps generate two bundles, one for modern browsers and one for old browsers:

```bash
browser-unpack < bundle.es6.js | \
  deps-transform babelify --presets [ env ] | \
  browser-pack > bundle.es5.js
```

## License

[Apache-2.0](LICENSE.md)
