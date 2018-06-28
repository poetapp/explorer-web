import { describe } from 'riteway'
import { Actions } from '../actions/index'
import { user } from './User.reducer'

const createUser = ({
  token = '123',
  profile = {
    email: 'anon@test.com',
    apiTokens: new Array(),
    verified: false,
    createdAt: '',
  },
} = {}) => ({
  token,
  profile,
})

describe('profile reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'default state and SIGN_IN_SUCCESS action with payload',
    should: 'default state',
    actual: user(
      createUser(),
      Actions.SignIn.onSignInSuccess(
        createUser({
          token: 'abc',
          profile: {
            email: 'jesse@test.com',
            apiTokens: new Array(),
            verified: true,
            createdAt: 'test',
          },
        })
      )
    ),
    expected: createUser({
      token: 'abc',
      profile: {
        email: 'jesse@test.com',
        apiTokens: new Array(),
        verified: true,
        createdAt: 'test',
      },
    }),
  })
})
