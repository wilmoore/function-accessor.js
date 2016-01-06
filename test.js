'use strict'

/*!
 * imports.
 */

var test = require('tape-catch')

/*!
 * imports (local).
 */

var accessor = require('./')

/*!
 * tests.
 */

test('accessor()', function (t) {
  var name = accessor()
  t.equal(typeof name, 'function', 'Accessor function is created')
  t.equal(name(), undefined, 'Value defaults to undefined')
  name('Jane')
  t.equal(name(), 'Jane', 'Setter returns getter which returns value previously set')
  t.end()
})

test('object.accessor(...).accessor()', function (t) {
  var person = {
    forename: accessor({ self: person }),
    surname: accessor({ self: person }),
    fullName: function () {
      return this.forename() + ' ' + this.surname()
    }
  }

  person
  .forename('Jane')
  .surname('Doe')

  t.equal(person.forename(), 'Jane', 'First name is set')
  t.equal(person.surname(), 'Doe', 'Last name is set')
  t.equal(person.fullName(), 'Jane Doe', 'Full name is set')
  t.end()
})

test('.check = Function', function (t) {
  var identifier = accessor({
    check: function isIdentifier (input) {
      return /^[_a-zA-Z]+[_a-zA-Z0-9]+/.test(input)
    }
  })

  identifier('NAME')
  t.assert(identifier(), 'NAME', 'Setter accepts values that pass validation check')
  t.throws(identifier.bind(null, '$NAME'), RangeError, 'Setter rejects values that fail validation check with a RangeError')
  t.end()
})

test('.check = RegExp', function (t) {
  var identifier = accessor({
    check: /^[_a-zA-Z]+[_a-zA-Z0-9]+/
  })

  identifier('NAME')
  t.assert(identifier(), 'NAME', 'Setter accepts values that pass validation check')
  t.throws(identifier.bind(null, '$NAME'), RangeError, 'Setter rejects values that fail validation check with a RangeError')
  t.end()
})

test('.init', function (t) {
  var name = accessor({
    init: 'Jane'
  })

  t.equal(name(), 'Jane', 'Initial value is returned when set')
  t.end()
})

test('.readonly', function (t) {
  var name = accessor({
    init: 'Jane',
    readonly: true
  })

  t.throws(name.bind(null, 'John'), RangeError, 'Setter rejects values by throwing a RangeError when .readonly property is set')
  t.end()
})

test('.self', function (t) {
  var data = {
    tags: [ 'person', 'contact' ]
  }
  var name = accessor({ self: data })

  t.assert(Array.isArray(name('Jane').tags), 'Assigned object context is returned from setter')
  t.end()
})
