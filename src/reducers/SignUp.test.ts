import { describe } from 'riteway'
import { Actions } from '../actions/index'
import { signUp } from './SignUp'

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

describe('signUp reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'no arguments',
    should: 'defaultState',
    actual: signUp(),
    expected: createState(),
  })

  assert({
    given: 'no state and SIGN_UP action',
    should: 'loading true',
    actual: signUp(undefined, Actions.SignUp.onSignUp()),
    expected: createState({ loading: true }),
  })

  assert({
    given: 'no state and SIGN_UP_SUCCESS action',
    should: 'default state',
    actual: signUp(undefined, Actions.SignUp.onSignUpSuccess()),
    expected: createState(),
  })

  {
    const e = 'test'
    assert({
      given: 'no state and SIGN_UP_ERROR action',
      should: 'state with error',
      actual: signUp(undefined, Actions.SignUp.onSignUpError(e)),
      expected: createState({
        error: {
          status: true,
          message: e,
        },
      }),
    })
  }
  assert({
    given: 'no state and SIGN_UP_CLEAR_ERROR action',
    should: 'default state',
    actual: signUp(undefined, Actions.SignUp.onSignUpClearError()),
    expected: createState(),
  })

  assert({
    given: 'default state and SIGN_UP action',
    should: 'loading true',
    actual: signUp(createState(), Actions.SignUp.onSignUp()),
    expected: createState({ loading: true }),
  })

  assert({
    given: 'default state and SIGN_UP_SUCCESS action',
    should: 'default state',
    actual: signUp(createState(), Actions.SignUp.onSignUpSuccess()),
    expected: createState(),
  })

  assert({
    given: 'state with loading true and SIGN_UP_SUCCESS action',
    should: 'default state',
    actual: signUp(createState({ loading: true }), Actions.SignUp.onSignUpSuccess()),
    expected: createState(),
  })

  {
    const e = 'test'
    assert({
      given: 'default state and SIGN_UP_ERROR action',
      should: 'state with error ',
      actual: signUp(createState(), Actions.SignUp.onSignUpError(e)),
      expected: createState({
        error: {
          status: true,
          message: e,
        },
      }),
    })
  }

  {
    const e = 'test'
    assert({
      given: 'state with error message and SIGN_UP_ERROR action',
      should: 'state with new error message ',
      actual: signUp(createState({ error: { status: true, message: 'not-test' } }), Actions.SignUp.onSignUpError(e)),
      expected: createState({
        error: {
          status: true,
          message: e,
        },
      }),
    })
  }

  assert({
    given: 'default state and SIGN_UP_CLEAR_ERROR action',
    should: 'default state',
    actual: signUp(createState(), Actions.SignUp.onSignUpClearError()),
    expected: createState(),
  })

  {
    const e = 'test'
    assert({
      given: 'state with error message and SIGN_UP_CLEAR_ERROR action',
      should: 'default state ',
      actual: signUp(createState({ error: { status: true, message: e } }), Actions.SignUp.onSignUpClearError()),
      expected: createState(),
    })
  }
})
