import { describe } from 'riteway'

import { FetchType, actionIsFetchAction, actionToFetchStoreEntry } from './FetchReducer'
import { FetchStatus } from '../enums/FetchStatus'

describe('actionIsFetchAction()', async (should: any) => {
  const { assert } = should()
  const createAction = (fetchType: string) => ({
    fetchType,
  })

  assert({
    given: `action object with fetchType: ${FetchType.MARK_LOADING}`,
    should: 'return true',
    actual: actionIsFetchAction(createAction(FetchType.MARK_LOADING)),
    expected: true,
  })

    assert({
    given: `action object with fetchType: ${FetchType.SET_RESULT}`,
    should: 'return true',
    actual: actionIsFetchAction(createAction(FetchType.SET_RESULT)),
    expected: true,
  })

  assert({
    given: `action object with fetchType: ${FetchType.ERROR} `,
    should: 'return true',
    actual: actionIsFetchAction(createAction(FetchType.ERROR)),
    expected: true,
  })

  assert({
    given: `action object with fetchType: ${FetchType.CLEAR} `,
    should: 'return true',
    actual: actionIsFetchAction(createAction(FetchType.CLEAR)),
    expected: true,
  })

  assert({
    given: `action object with fetchType: ${FetchType.NOT_FOUND} `,
    should: 'return true',
    actual: actionIsFetchAction(createAction(FetchType.NOT_FOUND)),
    expected: true,
  })

  assert({
    given: 'action object with fetchType not included in FetchType.Types',
    should: 'return false',
    actual: actionIsFetchAction(createAction('random test string')),
    expected: false,
  })

  assert({
    given: 'action object with no fetchType',
    should: 'return undefined',
    actual: actionIsFetchAction({ type: 'fetch requested'}),
    expected: undefined,
  })
})

describe('actionIsFetchAction()', async (should: any) => {
  const { assert } = should()
  const createAction = (fetchType: string = 'invalid fetchType', type: string = 'invalid type', url: string = 'test', body: any = {}, headers: Headers = {} as Headers) => {
    return {
      fetchType,
      type,
      url,
      body,
      headers
    }
  }

  {
    const test = () => {
      try {
        return actionToFetchStoreEntry(createAction())
      } catch (e) {
        return e
      }
    }

    assert({
      given: 'Fetch action object invalid FetchType',
      should: 'throw Error Invalid FetchType',
      actual: test(),
      expected: new Error(`FetchReducer: Invalid FetchType '${createAction().fetchType}'.`)
    })
  }

  assert({
    given: `Fetch action object with fetchType: ${FetchType.CLEAR}`,
    should: `return correct object`,
    actual: actionToFetchStoreEntry(createAction(FetchType.CLEAR)),
    expected: { status: FetchStatus.Uninitialized, body: null }
  })

  assert({
    given: `Fetch action object with fetchType: ${FetchType.MARK_LOADING}`,
    should: `return { status: ${FetchStatus.Loading} }`,
    actual: actionToFetchStoreEntry(createAction(FetchType.MARK_LOADING)),
    expected: { status: FetchStatus.Loading }
  })

  {
    const action = createAction(FetchType.SET_RESULT, FetchType.SET_RESULT, 'test', { test: 'testBody'});
    
    assert({
      given: `Fetch action object with fetchType: ${FetchType.SET_RESULT}`,
      should: `return correct object`,
      actual: actionToFetchStoreEntry(action),
      expected: {
        status: FetchStatus.Loaded,
        body: action.body,
        headers: action.headers
      }
    })
  }

  {
    const action = createAction(FetchType.NOT_FOUND, FetchType.NOT_FOUND, 'test', { test: 'testBody'});
    
    assert({
      given: `Fetch action object with fetchType: ${FetchType.NOT_FOUND}`,
      should: `return correct object`,
      actual: actionToFetchStoreEntry(action),
      expected: {
        status: FetchStatus.NotFound,
        error: action.body,
      }
    })
  }

  {
    const action = createAction(FetchType.ERROR, FetchType.ERROR, 'test', { test: 'testBody'});
    
    assert({
      given: `Fetch action object with fetchType: ${FetchType.ERROR}`,
      should: `return correct object`,
      actual: actionToFetchStoreEntry(action),
      expected: {
        status: FetchStatus.Error,
        error: action.body,
      }
    })
  }
})

describe('clearCache()', async (should: any) => {
  const { assert } = should()

  assert({
    given: '',
    should: '',
    actual: '',
    expected: '',
    
  })
})