/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

import first from '../ee-first'

/**
 * Invoke callback when the response has finished, useful for
 * cleaning up resources afterwards.
 *
 * @param {!(http.IncomingMessage|http.OutgoingMessage)} msg
 * @param {!Function} listener
 */
export default function onFinished(msg, listener) {
  if (isFinished(msg) !== false) {
    setImmediate(listener, null, msg)
    return msg
  }

  // attach the listener to the message
  attachListener(msg, listener)

  return msg
}

/**
 * Determine if message is already finished.
 *
 * @param {!(http.IncomingMessage|http.OutgoingMessage)} msg
 * @public
 */
export function isFinished(msg) {
  const socket = msg.socket

  if (typeof msg.finished == 'boolean') {
    // OutgoingMessage
    return Boolean(msg.finished || (socket && !socket.writable))
  }

  if (typeof msg.complete == 'boolean') {
    // IncomingMessage
    /**
     * @suppress {checkTypes}
     */
    const u = msg['upgrade']
    return Boolean(u || !socket || !socket.readable || (msg.complete && !msg.readable))
  }

  // don't know
  return undefined
}

/**
 * Attach a finished listener to the message.
 *
 * @param {!(http.IncomingMessage|http.OutgoingMessage)} msg
 * @param {Function} callback
 * @private
 */
function attachFinishedListener(msg, callback) {
  var eeMsg
  var eeSocket
  var finished = false

  function onFinish(error) {
    eeMsg.cancel()
    eeSocket.cancel()

    finished = true
    callback(error)
  }

  // finished on first message event
  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish)

  function onSocket(socket) {
    // remove listener
    msg.removeListener('socket', onSocket)

    if (finished) return
    if (eeMsg !== eeSocket) return

    // finished on first socket event
    eeSocket = first([[socket, 'error', 'close']], onFinish)
  }

  if (msg.socket) {
    // socket already assigned
    onSocket(msg.socket)
    return
  }

  // wait for socket to be assigned
  msg.on('socket', onSocket)
}

/**
 * Attach the listener to the message.
 *
 * @param {!(http.IncomingMessage|http.OutgoingMessage)} msg
 * @private
 */
function attachListener(msg, listener) {
  var attached = msg.__onFinished

  // create a private single listener with queue
  if (!attached || !attached.queue) {
    attached = msg.__onFinished = createListener(msg)
    attachFinishedListener(msg, attached)
  }

  attached.queue.push(listener)
}

/**
 * Create listener on message.
 *
 * @param {!(http.IncomingMessage|http.OutgoingMessage)} msg
 * @return {Function}
 * @private
 */
function createListener(msg) {
  function listener(err) {
    if (msg.__onFinished === listener) msg.__onFinished = null
    if (!listener.queue) return

    var queue = listener.queue
    listener.queue = null

    for (var i = 0; i < queue.length; i++) {
      queue[i](err, msg)
    }
  }

  listener.queue = []

  return listener
}

// /**
//  * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
//  *
//  * @param {!http.ServerResponse} res
//  * @param {Function} callback
//  * @private
//  */
// function patchAssignSocket(res, callback) {
//   /** @suppress {checkTypes} */
//   const assignSocket = res['assignSocket']

//   if (typeof assignSocket != 'function') return

//   // res.on('socket', callback) is broken in 0.8
//   res.assignSocket = function _assignSocket(socket) {
//     assignSocket.call(this, socket)
//     callback(socket)
//   }
// }


/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').OutgoingMessage} http.OutgoingMessage
 */