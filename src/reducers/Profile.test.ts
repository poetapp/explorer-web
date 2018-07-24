import { describe } from 'riteway'

import { Actions } from '../actions/index'
import { profile, defaultState } from './Profile'

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

describe('profile reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'no arguments',
    should: 'default state',
    actual: profile(),
    expected: defaultState,
  })

  assert({
    given: 'default state and PROFILE action',
    should: 'loading true',
    actual: profile(defaultState, Actions.Profile.onProfile()),
    expected: createState({ loading: true }),
  })

  assert({
    given: 'state with loading true and PROFILE_SUCCESS action',
    should: 'default state',
    actual: profile(createState({ loading: true }), Actions.Profile.onProfileSuccess()),
    expected: defaultState,
  })

  assert({
    given: 'state with loading true and PROFILE_ERROR action with payload',
    should: 'loading false and payload as message',
    actual: profile(createState({ loading: true }), Actions.Profile.onProfileError('test')),
    expected: createState({ loading: false, error: { status: true, message: 'test' } }),
  })

  assert({
    given: 'state with loading true and PROFILE_CLEAR_ERROR action',
    should: 'default state',
    actual: profile(createState({ loading: true }), Actions.Profile.onProfileClearError()),
    expected: defaultState,
  })
})
