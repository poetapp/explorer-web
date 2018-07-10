import { describe } from 'riteway'
import { Actions } from '../actions/index'
import { loadingPage } from './LoadingPage'

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
    expected: createState(),
  })

  assert({
    given: 'no state and LOADING_ON action',
    should: 'loading true percentage at 10',
    actual: loadingPage(undefined, Actions.LoadingPage.onLoadingOn()),
    expected: createState({ loading: true, percentage: 10 }),
  })

  assert({
    given: 'no state and LOADING_FULL action',
    should: 'loading true percentage at 100',
    actual: loadingPage(undefined, Actions.LoadingPage.onLoadingFull()),
    expected: createState({ loading: true, percentage: 100 }),
  })

  assert({
    given: 'no state and LOADING_OFF action',
    should: 'default state',
    actual: loadingPage(undefined, Actions.LoadingPage.onLoadingOff()),
    expected: createState(),
  })

  assert({
    given: 'default state and LOADING_ON action',
    should: 'loading true percentage at 10',
    actual: loadingPage(createState(), Actions.LoadingPage.onLoadingOn()),
    expected: createState({ loading: true, percentage: 10 }),
  })

  assert({
    given: 'default state and LOADING_FULL action',
    should: 'loading true percentage at 100',
    actual: loadingPage(createState(), Actions.LoadingPage.onLoadingFull()),
    expected: createState({ loading: true, percentage: 100 }),
  })

  assert({
    given: 'default state and LOADING_OFF action',
    should: 'loading false percentage at -1',
    actual: loadingPage(createState(), Actions.LoadingPage.onLoadingOff()),
    expected: createState(),
  })
})
