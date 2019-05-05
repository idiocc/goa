process.env.NO_DEPRECATION = 'http-errors'

import assert, { ok, strictEqual, notStrictEqual, throws } from 'assert'
import { isError } from 'util'
import createError from './'

export const createErrorStatus = {
  'creates error object'() {
    ok(isError(createError(500)))
  },
  'when status 300': {
    context: { error: createError(300) },
    'has "message" property of "Multiple Choices"'({ error }) {
      strictEqual(error.message, 'Multiple Choices')
    },
    'has "name" property of "Error"'({ error }) {
      strictEqual(error.name, 'Error')
    },
    'has "status" property of 300'({ error }) {
      strictEqual(error.status, 300)
    },
    'has "statusCode" property of 300'({ error }) {
      strictEqual(error.statusCode, 300)
    },
  },
  'when status 404': {
    context: { error: createError(404) },
    'has "message" property of "Not Found"'({ error }) {
      strictEqual(error.message, 'Not Found')
    },
    'has "name" property of "NotFoundError"'({ error }) {
      strictEqual(error.name, 'NotFoundError')
    },
    'has "status" property of 404'({ error }) {
      strictEqual(error.status, 404)
    },
    'has "statusCode" property of 404'({ error }) {
      strictEqual(error.statusCode, 404)
    },
  },
  'when status unknown 4xx': {
    context: { error: createError(499) },
    'has "message" property of "Bad Request"'({ error }) {
      strictEqual(error.message, 'Bad Request')
    },
    'has "name" property of "BadRequestError"'({ error }) {
      strictEqual(error.name, 'BadRequestError')
    },
    'has "status" property with code'({ error }) {
      strictEqual(error.status, 499)
    },
    'has "statusCode" property with code'({ error }) {
      strictEqual(error.statusCode, 499)
    },
  },
  'when status unknown 5xx': {
    context: { error: createError(599) },
    'has "message" property of "Internal Server Error"'({ error }) {
      strictEqual(error.message, 'Internal Server Error')
    },
    'has "name" property of "InternalServerError"'({ error }) {
      strictEqual(error.name, 'InternalServerError')
    },
    'has "status" property with code'({ error }) {
      strictEqual(error.status, 599)
    },
    'has "statusCode" property with code'({ error }) {
      strictEqual(error.statusCode, 599)
    },
  },
}

export const createErrorStatusMessage = {
  context: { error: createError(404, 'missing') },
  'creates error object'({ error }) {
    ok(isError(error))
  },
  'has "message" property with message'({ error }) {
    strictEqual(error.message, 'missing')
  },
  'has "status" property with status'({ error }) {
    strictEqual(error.status, 404)
  },
  'has "statusCode" property with status'({ error }) {
    strictEqual(error.statusCode, 404)
  },
}

export const HTTPErrors = {
  'createError(status, props)'() {
    const err = createError(404, {
      id: 1,
    })
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'Not Found')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
  },
  'createError(status, props) with status prop'() {
    const err = createError(404, {
      id: 1,
      status: 500,
    })
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'Not Found')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
  },
  'createError(status, props) with statusCode prop'() {
    const err = createError(404, {
      id: 1,
      statusCode: 500,
    })
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'Not Found')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
  },
  'createError(props)'() {
    const err = createError({
      id: 1,
    })
    strictEqual(err.name, 'InternalServerError')
    strictEqual(err.message, 'Internal Server Error')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.id, 1)
  },
  'createError(msg, status)'() {
    const err = createError('LOL', 404)
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
  },
  'createError(msg)'() {
    const err = createError('LOL')
    strictEqual(err.name, 'InternalServerError')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
  },
  'createError(msg, props)'() {
    const err = createError('LOL', {
      id: 1,
    })
    strictEqual(err.name, 'InternalServerError')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.id, 1)
  },
  'createError(err)'() {
    let _err = new Error('LOL')

    _err.status = 404
    let err = createError(_err)
    strictEqual(err, _err)
    strictEqual(err.name, 'Error')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.expose, true)

    _err = new Error('LOL')

    err = createError(_err)
    strictEqual(err, _err)
    strictEqual(err.name, 'Error')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.expose, false)

    err = createError(null)
    notStrictEqual(err, null)
    strictEqual(err.name, 'InternalServerError')
    strictEqual(err.message, 'Internal Server Error')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.expose, false)
  },
  'createError(err) with invalid err.status'() {
    const _err = new Error('Connection refused')
    _err.status = -1
    const err = createError(_err)
    strictEqual(err, _err)
    strictEqual(err.name, 'Error')
    strictEqual(err.message, 'Connection refused')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.expose, false)
  },
  'createError(err, props)'() {
    const _err = new Error('LOL')
    _err.status = 404
    const err = createError(_err, {
      id: 1,
    })
    strictEqual(err.name, 'Error')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
    strictEqual(err.expose, true)
  },
  'createError(status, err, props)'() {
    const _err = new Error('LOL')
    const err = createError(404, _err, {
      id: 1,
    })
    strictEqual(err, _err)
    strictEqual(err.name, 'Error')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
  },
  'createError(status, msg, props)'() {
    const err = createError(404, 'LOL', {
      id: 1,
    })
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'LOL')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.id, 1)
  },
  'createError(status, msg, { expose: false })'() {
    const err = createError(404, 'LOL', {
      expose: false,
    })
    strictEqual(err.expose, false)
  },
  // 'new createError.HttpError()'() {
  //   throws(() => {
  //     new createError.HttpError() // eslint-disable-line no-new
  //   }, /cannot construct abstract class/)
  // },
  'new createError.NotFound()'() {
    const err = new createError.NotFound()
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'Not Found')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.expose, true)
    assert(err.stack)
  },
  'new createError.InternalServerError()'() {
    const err = new createError.InternalServerError()
    strictEqual(err.name, 'InternalServerError')
    strictEqual(err.message, 'Internal Server Error')
    strictEqual(err.status, 500)
    strictEqual(err.statusCode, 500)
    strictEqual(err.expose, false)
    assert(err.stack)
  },
  'new createError["404"]()'() {
    const err = new createError['404']()
    strictEqual(err.name, 'NotFoundError')
    strictEqual(err.message, 'Not Found')
    strictEqual(err.status, 404)
    strictEqual(err.statusCode, 404)
    strictEqual(err.expose, true)
    assert(err.stack)
  },
  'should preserve error [[Class]]'() {
    strictEqual(Object.prototype.toString.call(createError('LOL')), '[object Error]')
    strictEqual(Object.prototype.toString.call(new createError[404]()), '[object Error]')
    strictEqual(Object.prototype.toString.call(new createError[500]()), '[object Error]')
  },
  'supports err instanceof Error'() {
    assert(createError(404) instanceof Error)
    assert((new createError['404']()) instanceof Error)
    assert((new createError['500']()) instanceof Error)
  },
  'supports err instanceof exposed constructor'() {
    assert(createError(404) instanceof createError.NotFound)
    assert(createError(500) instanceof createError.InternalServerError)
    assert((new createError['404']()) instanceof createError.NotFound)
    assert((new createError['500']()) instanceof createError.InternalServerError)
    assert((new createError.NotFound()) instanceof createError.NotFound)
    assert((new createError.InternalServerError()) instanceof createError.InternalServerError)
  },
  'supports err instanceof HttpError'() {
    assert(createError(404) instanceof createError.HttpError)
    assert((new createError['404']()) instanceof createError.HttpError)
    assert((new createError['500']()) instanceof createError.HttpError)
  },
  'supports isError()'() {
    /* eslint-disable node/no-deprecated-api */
    assert(isError(createError(404)))
    assert(isError(new createError['404']()))
    assert(isError(new createError['500']()))
    /* eslint-enable node/no-deprecated-api */
  },
}
