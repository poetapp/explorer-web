import { describe } from 'riteway'

import { FetchType, actionToFetchStoreEntry, fetchReducer } from './FetchReducer'
import { FetchStatus } from '../enums/FetchStatus'
import { FetchStoreEntry } from '../store/PoetAppState'

describe('fetchReducer()', async ( should: any) => {
  const createAction = (fetchType: string = 'invalid fetchType', type: string = 'invalid type', url: string = 'test', body: any = {}, headers: Headers = {} as Headers) => ({
      fetchType,
      type,
      url,
      body,
      headers
    })
  const { assert } = should();

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.CLEAR} action`,
      should: 'return updated store with cleared cache for the base urls',
      actual: fetchReducer(store, createAction(FetchType.CLEAR, FetchType.CLEAR, 'test')),
      expected: { ...store, ...{ 'test': { status: FetchStatus.Uninitialized, body: null }, 'test?ft=foo': { status: FetchStatus.Uninitialized, body: null } } },
    })
  }
  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.CLEAR} action with url not in store`,
      should: 'return store',
      actual: fetchReducer(store, createAction(FetchType.CLEAR, FetchType.CLEAR, 'badTest')),
      expected: store,
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.MARK_LOADING} action with url in store`,
      should: 'return updated store',
      actual: fetchReducer(store, createAction(FetchType.MARK_LOADING, FetchType.MARK_LOADING, 'test')),
      expected: { ...store, ...{ 'test': { status: FetchStatus.Loading } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.MARK_LOADING} action with url not in store`,
      should: 'return updated store',
      actual: fetchReducer(store, createAction(FetchType.MARK_LOADING, FetchType.MARK_LOADING, 'newTest')),
      expected: { ...store, ...{ 'newTest': { status: FetchStatus.Loading } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.MARK_LOADING} action with url in store`,
      should: 'return updated store',
      actual: fetchReducer(store, createAction(FetchType.MARK_LOADING, FetchType.MARK_LOADING, 'test')),
      expected: { ...store, ...{ 'test': { status: FetchStatus.Loading } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }

    assert({
      given: `store and ${FetchType.MARK_LOADING} action with url not in store`,
      should: 'return updated store',
      actual: fetchReducer(store, createAction(FetchType.MARK_LOADING, FetchType.MARK_LOADING, 'newTest')),
      expected: { ...store, ...{ 'newTest': { status: FetchStatus.Loading } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.SET_RESULT, FetchType.SET_RESULT, 'test')

    assert({
      given: `store and ${FetchType.SET_RESULT} action with url in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'test': { status: FetchStatus.Loaded, body: action.body, headers: action.headers } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.SET_RESULT, FetchType.SET_RESULT, 'newTest')

    assert({
      given: `store and ${FetchType.SET_RESULT} action with url not in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'newTest': { status: FetchStatus.Loaded, body: action.body, headers: action.headers } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.ERROR, FetchType.ERROR, 'test')

    assert({
      given: `store and ${FetchType.ERROR} action with url in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'test': { status: FetchStatus.Error, error: action.body } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.ERROR, FetchType.ERROR, 'newTest')

    assert({
      given: `store and ${FetchType.ERROR} action with url not in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'newTest': { status: FetchStatus.Error, error: action.body } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.NOT_FOUND, FetchType.NOT_FOUND, 'test')

    assert({
      given: `store and ${FetchType.NOT_FOUND} action with url in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'test': { status: FetchStatus.NotFound, error: action.body } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    const action = createAction(FetchType.NOT_FOUND, FetchType.NOT_FOUND, 'newTest')

    assert({
      given: `store and ${FetchType.NOT_FOUND} action with url not in store`,
      should: 'return updated store',
      actual: fetchReducer(store, action),
      expected: { ...store, ...{ 'newTest': { status: FetchStatus.NotFound, error: action.body } } },
    })
  }

  {
    const store = {
      'test?ft=foo': {} as FetchStoreEntry<any>,
      'test': {} as FetchStoreEntry<any>,
      'other': {} as FetchStoreEntry<any>,
      'anotherTest?ft=foo,bar,baz': {} as FetchStoreEntry<any>,
    }
    assert({
      given: `store and action that is not a fetchAction`,
      should: 'return store',
      actual: fetchReducer(store, createAction()),
      expected: store,
    })
  }

  {
    let store
    assert({
      given: `undefined store and action that is not a fetchAction`,
      should: 'return empty object',
      actual: fetchReducer(store, createAction()),
      expected: {},
    })
  }
})

describe('actionToFetchStoreEntry()', async ( should: any) => {
  const { assert } = should()

  const createAction = (fetchType: string = 'invalid fetchType', type: string = 'invalid type', url: string = 'test', body: any = {}, headers: Headers = {} as Headers) => ({
      fetchType,
      type,
      url,
      body,
      headers
    })

  const action = createAction('badType')
  const test = () => {
    try {
      return actionToFetchStoreEntry(action)
    } catch (e) {
      return e
    }
  }
  assert({
    given: 'invalid FetchType',
    should: 'throw error',
    actual: test(),
    expected: new Error(`FetchReducer: Invalid FetchType '${action.fetchType}'.`)
  })
})