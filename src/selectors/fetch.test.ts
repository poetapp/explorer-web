import { describe } from 'riteway'

import { getResourceState } from './fetch'
import { FetchStatus } from '../enums/FetchStatus'

const createState = (url: string = '', status: number = 0) => {
  let obj = {
    fetch: {} as any,
    modals: {}
  }
  obj.fetch[url] = {}
  obj.fetch[url]['status'] = status

  return obj
}

describe('getResourceState()', async (should: any) => {
  const { assert } = should()
  {
    const url = 'test'
    const state = createState()

    assert({
      given: 'url that is not included in state',
      should: 'return 0',
      actual: getResourceState(url)(state),
      expected: 0
    })
  }
  
  {
    const url = 'test'
    const state = createState(url, FetchStatus.Loading)

    assert({
      given: 'url included in state with loading status',
      should: 'return 1',
      actual: getResourceState(url)(state),
      expected: 1
    })
  }

  {
    const url = 'test'
    const state = createState(url,FetchStatus.Loaded)

    assert({
      given: 'url included in state with loaded status',
      should: 'return 2',
      actual: getResourceState(url)(state),
      expected: 2
    })
  }

  {
    const url = 'test'
    const state = createState(url, FetchStatus.Error)

    assert({
      given: 'url included in state with error status',
      should: 'return 3',
      actual: getResourceState(url)(state),
      expected: 3
    })
  }

  {
    const url = 'test'
    const state = createState(url, FetchStatus.NotFound)

    assert({
      given: 'url included in state with not found status',
      should: 'return 4',
      actual: getResourceState(url)(state),
      expected: 4
    })
  }
})