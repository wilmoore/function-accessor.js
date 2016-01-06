# function-accessor
> Higher-Order accessor functions.

[![Build Status](http://img.shields.io/travis/wilmoore/function-accessor.js.svg)](https://travis-ci.org/wilmoore/function-accessor.js) [![Code Climate](https://codeclimate.com/github/wilmoore/function-accessor.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/function-accessor.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install function-accessor --save
```

> You can also use Duo, Bower or [download the files manually](https://github.com/wilmoore/array-head.js/releases).

###### npm stats

[![npm](https://img.shields.io/npm/v/function-accessor.svg)](https://www.npmjs.org/package/function-accessor) [![NPM downloads](http://img.shields.io/npm/dm/function-accessor.svg)](https://www.npmjs.org/package/function-accessor) [![David](https://img.shields.io/david/wilmoore/function-accessor.js.svg)](https://david-dm.org/wilmoore/function-accessor.js)

## Usage

```js
var accessor = require('function-accessor')
```

## Features

* Automatic method chaining on object setters.
* Initial (default) value support.
* Input validation on setters.
* Read-only getter support.

## API

###### accessor()

```js
var assert = require('assert')

var latitude = accessor()

latitude(32.7229)
assert.equal(latitude(), 32.7229)
//=> undefined

latitude(45.49428)
assert.equal(latitude(), 45.49428)
//=> undefined
```

###### accessor({ init: … })

```js
var assert = require('assert')

var latitude = accessor({
  init: 32.7229
})

assert.equal(latitude(), 32.7229)
//=> undefined

latitude(45.49428)
assert.equal(latitude(), 45.49428)
//=> undefined
```

###### accessor({ check: Function })

```js
var assert = require('assert')
var isNumber = require('util').isNumber

var latitude = accessor({
  check: isNumber
})

latitude(45.49428)
assert.equal(latitude(), 45.49428)
//=> undefined

latitude('this is not a number!!')
//=> RangeError
```

###### accessor({ check: RegExp })

```js
var assert = require('assert')

var pin = accessor({
  check: /^\d{4}$/
})

latitude(1234)
assert.equal(pin(), 1234)
//=> undefined

pin('123')
//=> RangeError
```

###### accessor({ readonly: true })

```js
var latitude = accessor({
  init: 32.7229,
  readonly: true
})

assert.equal(latitude(), 32.7229)
//=> undefined

latitude(45.49428)
//=> TypeError
```

###### accessor({ self: this })

```js
var assert = require('assert')

var address = {
  street: accessor({
    self: address
  }),

  city: accessor({
    self: address
  }),

  state: accessor({
    self: address
  }),

  zip: accessor({
    self: address
  }),

  country: accessor({
    self: address
  })
}

address
  .street('200 E Main Street')
  .city('Phoenix')
  .state('AZ')
  .zip('85123')
  .country('USA')

assert.equal(address.country(), 'USA')
//=> undefined
```

## Contributing

> SEE: [contributing.md](contributing.md)

## Alternatives / Inspiration

* [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
* [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
* [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
* [component-model](https://github.com/component/model)
* [component-attr](https://github.com/weepy/attr)
* [attr](https://github.com/azer/attr)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/function-accessor.js.svg)](https://github.com/wilmoore/function-accessor.js/blob/master/license)
