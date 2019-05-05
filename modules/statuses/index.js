/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
import statusCodes from './codes'

// status code to message map
export const STATUS_CODES = statusCodes

// array of status codes
export const codes = populateStatusesMap(status, statusCodes)

// status codes for redirects
export const redirect = {
  [300]: true,
  [301]: true,
  [302]: true,
  [303]: true,
  [305]: true,
  [307]: true,
  [308]: true,
}

// status codes for empty bodies
export const empty = {
  [204]: true,
  [205]: true,
  [304]: true,
}

// status codes for when you should retry the request
export const retry = {
  [502]: true,
  [503]: true,
  [504]: true,
}

/**
 * Populate the statuses map for given codes.
 * @return {!Array<string>}
 * @private
 */
function populateStatusesMap(statuses, allCodes) {
  const arr = []

  Object.keys(allCodes).forEach((code) => {
    const message = statusCodes[code]
    const s = Number(code)

    // Populate properties
    statuses[s] = message
    statuses[message] = s
    statuses[message.toLowerCase()] = s

    // Add to array
    arr.push(s)
  })

  return arr
}

/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 * @param {string|number} code
 */
export default function status(code) {
  if (typeof code == 'number') {
    if (!status[code])
      throw new Error('invalid status code: ' + code)
    return code
  }

  if (typeof code != 'string')
    throw new TypeError('code must be a number or string')

  // '403'
  var n = parseInt(code, 10)
  if (!isNaN(n)) {
    if (!status[n]) throw new Error('invalid status code: ' + n)
    return n
  }

  n = status[code.toLowerCase()]
  if (!n) throw new Error('invalid status message: "' + code + '"')
  return n
}
