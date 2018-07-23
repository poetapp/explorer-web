import { describe } from 'riteway'

import { Actions } from '../actions/index'
import { signIn } from './SignIn'

const createState = ({
  error = {
    status: false,
    message: '',
  },
  loading = false,
} = {}) => ({
  error,
  loading,
})

describe('signIn reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'default state and SIGN_IN action',
    should: 'loading true',
    actual: signIn(createState(), Actions.SignIn.onSignIn()),
    expected: createState({ loading: true }),
  })

  assert({
    given: 'Error message and SIGN_IN action',
    should: 'loading true and empty error message',
    actual: signIn(
      createState({
        error: {
          status: true,
          message: 'test',
        },
      }),
      Actions.SignIn.onSignIn()
    ),
    expected: createState({ loading: true }),
  })

  assert({
    given: 'default state and SIGN_IN_SUCCESS action',
    should: 'loading true',
    actual: signIn(createState(), Actions.SignIn.onSignInSuccess()),
    expected: createState(),
  })

  assert({
    given: 'Error message and loading true and SIGN_IN_SUCCESS action',
    should: 'empty error message and loading false',
    actual: signIn(
      createState({
        error: {
          status: true,
          message: 'test',
        },
        loading: true,
      }),
      Actions.SignIn.onSignInSuccess()
    ),
    expected: createState(),
  })

  assert({
    given: 'default state and SIGN_IN_ERROR action with payload',
    should: 'payload as error message',
    actual: signIn(createState(), Actions.SignIn.onSignInError('test')),
    expected: createState({
      error: {
        status: true,
        message: 'test',
      },
    }),
  })

  assert({
    given: 'loading true and error message and SIGN_IN_ERROR action with payload',
    should: 'payload as error message and loading false',
    actual: signIn(
      createState({
        error: {
          status: true,
          message: 'not-test',
        },
        loading: true,
      }),
      // TODO: Figure out if payload should be an object
      Actions.SignIn.onSignInError('test')
    ),
    expected: createState({
      error: {
        status: true,
        message: 'test',
      },
    }),
  })

  assert({
    given: 'default state and SIGN_IN_CLEAR_ERROR action',
    should: 'loading true',
    actual: signIn(createState(), Actions.SignIn.onSignInClearError()),
    expected: createState(),
  })

  assert({
    given: 'loading true and error message and SIGN_IN_CLEAR_ERROR action',
    should: 'loading true',
    actual: signIn(
      createState({
        error: {
          status: true,
          message: 'not-test',
        },
        loading: true,
      }),
      Actions.SignIn.onSignInClearError()
    ),
    expected: createState(),
  })
})
