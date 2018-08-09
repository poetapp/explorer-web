import { describe } from 'riteway'

import { Actions } from '../actions/index'
import { loadingPage, defaultState } from './LoadingPage'

const createState = ({ loading = false, percentage = -1 } = {}) => ({
  loading,
  percentage,
})

describe('loadingPage reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'no arguments',
    should: 'default state',
    actual: loadingPage(),
    expected: defaultState,
  })

  assert({
    given: 'default state and LOADING_ON action',
    should: 'loading true percentage at 10',
    actual: loadingPage(defaultState, Actions.LoadingPage.onLoadingOn()),
    expected: createState({ loading: true, percentage: 10 }),
  })

  assert({
    given: 'default state and LOADING_FULL action',
    should: 'loading true percentage at 100',
    actual: loadingPage(defaultState, Actions.LoadingPage.onLoadingFull()),
    expected: createState({ loading: true, percentage: 100 }),
  })

  assert({
    given: 'default state and LOADING_OFF action',
    should: 'loading false percentage at -1',
    actual: loadingPage(defaultState, Actions.LoadingPage.onLoadingOff()),
    expected: defaultState,
  })
})
