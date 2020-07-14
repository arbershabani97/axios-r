import forEach from 'lodash.foreach'
import isPlainObject from 'lodash.isplainobject'
import isArray from 'lodash.isarray'
import camelCase from 'lodash.camelcase'

// eslint-disable-next-line camelcase
const objectKeysToCamelCase = (snake_case_object) => {
  const camelCaseObject = {}
  const camelCaseArray = []
  forEach(snake_case_object, (value, key) => {
    if (isPlainObject(value) || isArray(value)) {
      /*
       * checks that a value is a plain object or an array - for recursive key conversion
       * recursively update keys of any values that are also objects
       */
      value = objectKeysToCamelCase(value)
    }
    if (isArray(snake_case_object)) camelCaseArray.push(value)
    else camelCaseObject[camelCase(key)] = value
  })
  if (isArray(snake_case_object)) return camelCaseArray
  return camelCaseObject
}

function camelToUnderscore(key) {
  // eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
  const result = String(key).replace(/([A-Z])/g, ' $1')
  return result.split(' ').join('_').toLowerCase()
}

const objectKeysToSnakeCase = (camelCaseObject) => {
  // eslint-disable-next-line camelcase
  const snake_case_object = {}
  const snakeCaseArray = []
  forEach(camelCaseObject, (value, key) => {
    if (isPlainObject(value) || isArray(value)) {
      /*
       * checks that a value is a plain object or an array - for recursive key conversion
       * recursively update keys of any values that are also objects
       */
      value = objectKeysToSnakeCase(value)
    }
    if (isArray(camelCaseObject)) snakeCaseArray.push(value)
    else snake_case_object[camelToUnderscore(key)] = value
  })
  if (isArray(camelCaseObject)) return snakeCaseArray

  // eslint-disable-next-line camelcase
  return snake_case_object
}

export { objectKeysToCamelCase, objectKeysToSnakeCase }

// ex. await getChannels({page, perPage: 500, "filtesr[agsLed]": {filterKey: 12}, filtesrKsaf: {filterKey: 12}});
