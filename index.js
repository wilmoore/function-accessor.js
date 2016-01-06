'use strict'

/*!
 * exports.
 */

module.exports = define

/*!
 * errors.
 */

var errorReadonly = new RangeError('Using accessor as a setter is not allow as it is marked as readonly!')
var errorInvalid = new RangeError('Value is not in the set or range of allowed values')

/**
 * Returns an accessor (getter/setter) function.
 *
 * @param {Object} [options]
 * Options object.
 *
 * @param {Function|RegExp} [options.check]
 * Predicate to check value against.
 *
 * @param {*} [options.init]
 * Initial/default value.
 *
 * @param {Boolean} [options.readonly=false]
 * Whether accessor is read only.
 *
 * @param {Object} [options.self]
 * Object context.
 *
 * @return {Function}
 * Accessor function.
 */

function define (options) {
  options = options || {}
  var initial = options.init
  var check = options.check
  var context = options.self
  var readonly = options.readonly || false

  function accessor (input) {
    // setter
    if (arguments.length) {
      if (readonly) throw errorReadonly
      if (!isValid(input, check, this)) throw errorInvalid
      accessor.value = input
      return this
    }

    // getter
    return accessor.value
  }

  accessor.value = initial
  return context ? accessor.bind(context) : accessor
}

/**
 * Validates input per predicate if predicate is a `Function` or `RegExp`.
 *
 * @param {*} value
 * Value to check.
 *
 * @param {Function|RegExp} [predicate]
 * Predicate to check value against.
 *
 * @param {Object} [self]
 * Object context.
 *
 * @return {Boolean}
 * Whether value is valid.
 */

function isValid (value, predicate, self) {
  if (predicate instanceof Function) {
    return predicate.call(self, value)
  }

  if (predicate instanceof RegExp) {
    return predicate.test(value)
  }

  return true
}
