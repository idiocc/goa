import { equal } from '@zoroaster/assert'
import Context from '../../context'

export const context = Context

/** @type {TestSuite} */
export const message = {
  'sets .status to 500'({ ctx }) {
    try {
      ctx.throw('boom')
    } catch (err) {
      equal(err.status, 500)
      equal(err.expose, false)
    }
  },
}

/** @type {TestSuite} */
export const error = {
  'should set .status to 500'({ ctx }) {
    const err = new Error('test')

    try {
      ctx.throw(err)
    } catch (e) {
      equal(e.status, 500)
      equal(e.message, 'test')
      equal(e.expose, false)
    }
  },
}

/** @type {TestSuite} */
export const errStatus = {
  'should throw the error and set .status'({ ctx }) {
    const err = new Error('test')

    try {
      ctx.throw(err, 422)
    } catch (e) {
      equal(e.status, 422)
      equal(e.message, 'test')
      equal(e.expose, true)
    }
  },
}

/** @type {TestSuite} */
export const statusErr = {
  'should throw the error and set .status'({ ctx }) {
    const err = new Error('test')

    try {
      ctx.throw(422, err)
    } catch (e) {
      equal(e.status, 422)
      equal(e.message, 'test')
      equal(e.expose, true)
    }
  },
}

/** @type {TestSuite} */
export const msgStatus = {
  'should throw an error'({ ctx }) {
    try {
      ctx.throw('name required', 400)
    } catch (err) {
      equal(err.message, 'name required')
      equal(err.status, 400)
      equal(err.expose, true)
    }
  },
}

/** @type {TestSuite} */
export const statusMsg = {
  'should throw an error'({ ctx }) {
    try {
      ctx.throw(400, 'name required')
    } catch (err) {
      equal(err.message, 'name required')
      equal(400, err.status)
      equal(true, err.expose)
    }
  },
}

/** @type {TestSuite} */
export const status = {
  'should throw an error'({ ctx }) {
    try {
      ctx.throw(400)
    } catch (err) {
      equal(err.message, 'Bad Request')
      equal(err.status, 400)
      equal(err.expose, true)
    }
  },

  'when not valid status': {
    'should not expose'({ ctx }) {
      try {
        const err = new Error('some error')
        err.status = -1
        ctx.throw(err)
      } catch (err) {
        equal(err.message, 'some error')
        equal(err.expose, false)
      }
    },
  },
}

/** @type {TestSuite} */
export const statusMsgProps = {
  'should mixin props'({ ctx }) {
    try {
      ctx.throw(400, 'msg', { prop: true })
    } catch (err) {
      equal(err.message, 'msg')
      equal(err.status, 400)
      equal(err.expose, true)
      equal(err.prop, true)
    }
  },

  'when props include status': {
    'should be ignored'({ ctx }) {
      try {
        ctx.throw(400, 'msg', {
          prop: true,
          status: -1,
        })
      } catch (err) {
        equal(err.message, 'msg')
        equal(err.status, 400)
        equal(err.expose, true)
        equal(err.prop, true)
      }
    },
  },
}

/** @type {TestSuite} */
export const msgProps = {
  'should mixin props'({ ctx }) {
    try {
      ctx.throw('msg', { prop: true })
    } catch (err) {
      equal(err.message, 'msg')
      equal(err.status, 500)
      equal(err.expose, false)
      equal(err.prop, true)
    }
  },
}

/** @type {TestSuite} */
export const statusProps = {
  'should mixin props'({ ctx }) {
    try {
      ctx.throw(400, { prop: true })
    } catch (err) {
      equal(err.message, 'Bad Request')
      equal(err.status, 400)
      equal(err.expose, true)
      equal(err.prop, true)
    }
  },
}

/** @type {TestSuite} */
export const errProps = {
  'should mixin props'({ ctx }) {
    try {
      ctx.throw(new Error('test'), { prop: true })
    } catch (err) {
      equal(err.message, 'test')
      equal(err.status, 500)
      equal(err.expose, false)
      equal(err.prop, true)
    }
  },
}

/**
 * @typedef {import('../../context').TestSuite} TestSuite
 */