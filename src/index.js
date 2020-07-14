import { objectKeysToCamelCase, objectKeysToSnakeCase } from './camelCase'
import _dispatcher from './dispatcher'
import axiosRequest from './axiosRequest'
import generateId from './generateId'

let axiosR
let dispatcher

const axiosRInit = (axios, store, Actions) => {
  axiosR = axiosRequest(axios, store)
  dispatcher = _dispatcher(Actions)
}

export {
  axiosR,
  axiosRInit,
  generateId,
  dispatcher,
  objectKeysToCamelCase,
  objectKeysToSnakeCase
}
