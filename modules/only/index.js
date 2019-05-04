/**
 * Return white-listed properties of an object.
 * @param {Object} obj
 * @param {(!Array<string>|string)} keys
 */
export default function(obj = {}, keys = []){
  if ('string' == typeof keys) keys = keys.split(/ +/)
  return keys.reduce((ret, key) => {
    if (null == obj[key]) return ret
    ret[key] = obj[key]
    return ret
  }, {})
}