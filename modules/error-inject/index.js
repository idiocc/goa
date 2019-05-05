import Stream from 'stream'

export default function (stream, error) {
  if (stream instanceof Stream && !stream.listeners('error').includes(error)) {
    stream.on('error', error)
  }
  return stream
}

/**
 * @license MIT
 * Author dead_horse <dead_horse@qq.com>
 * https://github.com/node-modules/error-inject
 */