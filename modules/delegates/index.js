/**
 * Creates a delegator instance used to configure using the `prop` on the given
`proto` object (which is usually a prototype).
 */
export default class Delegator {
  /**
   * Initialize a delegator.
   * @param {!Object} proto
   * @param {string} target
   */
  constructor(proto, target) {
    this.proto = proto
    this.target = target
    /** @type {!Array<string>} */
    this.methods = []
    /** @type {!Array<string>} */
    this.getters = []
    /** @type {!Array<string>} */
    this.setters = []
    /** @type {!Array<string>} */
    this.fluents = []
  }
  /**
   * Delegate method `name`.
   * @param {string} name
   * @return {Delegator} self
   */
  method(name) {
    const proto = this.proto
    const target = this.target
    this.methods.push(name)

    proto[name] = function() {
      return this[target][name].apply(this[target], arguments)
    }

    return this
  }
  /**
   * Delegator accessor `name`.
   * @param {string} name
   * @return {Delegator} self
   */
  access(name) {
    return this.getter(name).setter(name)
  }
  /**
   * Delegator getter `name`.
   * @param {string} name
   * @return {Delegator} self
   */
  getter(name) {
    const proto = this.proto
    const target = this.target
    this.getters.push(name)

    proto.__defineGetter__(name, function() {
      return this[target][name]
    })

    return this
  }
  /**
   * Delegator setter `name`.
   * @param {string} name
   * @return {Delegator} self
   */
  setter(name) {
    var proto = this.proto
    var target = this.target
    this.setters.push(name)

    proto.__defineSetter__(name, function(val) {
      return this[target][name] = val
    })

    return this
  }
  /**
   * Delegator fluent accessor.
   * @param {string} name
   * @return {Delegator} self
   */
  fluent(name) {
    var proto = this.proto
    var target = this.target
    this.fluents.push(name)

    proto[name] = function(val ){
      if (val !== undefined) {
        this[target][name] = val
        return this
      } else {
        return this[target][name]
      }
    }

    return this
  }
}

/**
 * @license MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 * https://npmjs.org/delegates
 */