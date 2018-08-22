import { describe } from 'riteway'

import './Array'

describe('Array.prototype.filterTruthy', async (should: any) => {
  const { assert } = should()

  {
    const arr = ['truthy', true, 'works', 5]

    assert({
      given: 'array of truthy values',
      should: 'return the full array',
      actual: arr.filterTruthy(),
      expected: ['truthy', true, 'works', 5]
    })
  }

  {
    const arr = ['truthy', true, false, undefined, null]

    assert({
      given: 'array of truthy and falsy values',
      should: 'return the truthy values',
      actual: arr.filterTruthy(),
      expected: ['truthy', true]
    })
  }

  {
    const arr = [false, undefined, null]

    assert({
      given: 'array of falsy values',
      should: 'return an empty array',
      actual: arr.filterTruthy(),
      expected: []
    })
  }
})

describe('Array.prototype.toObject', async (should: any) => {
  const { assert } = should()

  {
    const arr = [['key1', 'value1'], ['key2', 'value2']]
    const cb = (arr: ReadonlyArray<any>) => ({
      key: arr[0],
      value: arr[1]
    })

    assert({
      given: 'array of key value pairs and a callback that assigns the key + vlaue',
      should: 'return the an object of the key value pairs',
      actual: arr.toObject(cb),
      expected: { key1: 'value1', key2: 'value2' }
    })
  }
})

describe('Array.prototype.includes', async (should: any) => {
  const { assert } = should()

  {
    const arr = ['test', 5, undefined, true, null]
 
    assert({
      given: 'array of values and an included test string',
      should: 'return true',
      actual: arr.includes('test'),
      expected: true
    })

    assert({
      given: 'array of values and an included test number',
      should: 'return true',
      actual: arr.includes(5),
      expected: true
    })

    assert({
      given: 'array of values and an included true value',
      should: 'return true',
      actual: arr.includes(true),
      expected: true
    })

    assert({
      given: 'array of values and an included undefined value',
      should: 'return true',
      actual: arr.includes(undefined),
      expected: true
    })

    assert({
      given: 'array of values and an included null value',
      should: 'return true',
      actual: arr.includes(null),
      expected: true
    })

    assert({
      given: 'array of values and a value not in the array',
      should: 'return false',
      actual: arr.includes('foo'),
      expected: false
    })
  }

  {
    const arr: any = ['test', 'strings', 5]

    assert({
      given: 'array of values and undefined that is not in the array',
      should: 'return false',
      actual: arr.includes(undefined),
      expected: false
    })

    assert({
      given: 'array of values and false that is not in the array',
      should: 'return false',
      actual: arr.includes(false),
      expected: false
    })

    assert({
      given: 'array of values and null that is not in the array',
      should: 'return false',
      actual: arr.includes(null),
      expected: false
    })
  }
})
