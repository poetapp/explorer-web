import { describe } from 'riteway'
import { fetchReducer } from './fetchReducer'

const actionCreator = (fetch: object) => ({
  type: 'persist/REHYDRATE',
  payload: {
    fetch,
  }
})

describe('FetchReducer REHYDRATE', async (assert: any) => {

  {  
    const actual = fetchReducer({}, actionCreator({}))
    const expected = {}

    assert({
      given: 'no arguments',
      should: 'empty object',
      actual,
      expected,
    })
  }

  { 
    const exampleWork = {
      'https://api.explorer.po.et/works/111': {
         'status': 2,
      }
    }

    const actual = fetchReducer({}, actionCreator(exampleWork))
    const expected = {
      'https://api.explorer.po.et/works/111': {
         'status': 0,
      }
    }

    assert({
      given: 'a work object with a previous status',
      should: 'return with the status 0',
      actual,
      expected,
    })
  }

  { 
    const exampleWorks = {
      'https://api.explorer.po.et/works/111': {
         'status': 2,
      },
      'https://api.explorer.po.et/works/222': {
         'status': 3,
      }
    }

    const actual = fetchReducer({}, actionCreator(exampleWorks))
    const expected = {
      'https://api.explorer.po.et/works/111': {
         'status': 0,
      },
      'https://api.explorer.po.et/works/222': {
         'status': 0,
      }
    }

    assert({
      given: 'two work objects with a previous status',
      should: 'return with the status 0',
      actual,
      expected,
    })
  }
})


