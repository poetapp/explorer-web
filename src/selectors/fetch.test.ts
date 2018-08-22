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
      should: `return ${FetchStatus.Uninitialized}`,
      actual: getResourceState(url)(state),
      expected: FetchStatus.Uninitialized
    })
  }
  
  {
    const url = 'test'
    const state = createState(url, FetchStatus.Loading)

    assert({
      given: 'url included in state with loading status',
      should: `return ${FetchStatus.Loading}`,
      actual: getResourceState(url)(state),
      expected: FetchStatus.Loading
    })
  }

  {
    const url = 'test'
    const state = createState(url,FetchStatus.Loaded)

    assert({
      given: 'url included in state with loaded status',
      should: `return ${FetchStatus.Loaded}`,
      actual: getResourceState(url)(state),
      expected: FetchStatus.Loaded
    })
  }

  {
    const url = 'test'
    const state = createState(url, FetchStatus.Error)

    assert({
      given: 'url included in state with error status',
      should: `return ${FetchStatus.Error}`,
      actual: getResourceState(url)(state),
      expected: FetchStatus.Error
    });
  }

  {
    const url = 'test'
    const state = createState(url, FetchStatus.NotFound)

    assert({
      given: 'url included in state with not found status',
      should: `return ${FetchStatus.NotFound}`,
      actual: getResourceState(url)(state),
      expected: FetchStatus.NotFound
    })
  }
})