import { describe } from 'riteway'

import './String'

describe('String.prototype.firstAndLastCharacters', async ( should: any) => {
  const { assert } = should()

  {
    const testString = 'testmeonlongstring'
    assert({
      given: 'number 6 and string longer than length 12',
      should: 'return the 6 fist and last characters of the string seperated by ...',
      actual: testString.firstAndLastCharacters(6),
      expected: 'testme...string',
    })
  }

  {
    const testString = 'teststring'
    assert({
      given: 'number 6 and string shorter than length 12',
      should: 'return the 6 fist and last characters of the string seperated by ...',
      actual: testString.firstAndLastCharacters(6),
      expected: 'testst...string',
    })
  }

  {
    const testString = 'test'
    assert({
      given: 'number 6 and string shorter than length 6',
      should: 'return the string 2 times seperated by ...',
      actual: testString.firstAndLastCharacters(6),
      expected: 'test...test',
    })
  }
})

describe('String.prototype.trimLeftByPattern', async (should: any) => {
  const { assert } = should()

  {
    const testString = 'bad/init'
    
    assert({
      given: 'string that does not begin with supplied pattern',
      should: 'return string',
      actual: testString.trimLeftByPattern('/'),
      expected: 'bad/init',
    })
  }

  {
    const testString = '/good/init'
    
    assert({
      given: 'string that begins with supplied pattern',
      should: 'return string',
      actual: testString.trimLeftByPattern('/'),
      expected: 'good/init',
    })
  }
})

describe('String.prototype.padEnd', async (should: any) => {
  const { assert } = should()

  {
    const testString = 't'
    
    assert({
      given: 'string shorter than supplied targetLength + long padString',
      should: 'return correct string',
      actual: testString.padEnd(5, 'thisistoolong'),
      expected: 'tthis',
    })
  }

  {
    const testString = 't'
    
    assert({
      given: 'string shorter than supplied targetLength + padString',
      should: 'return correct string',
      actual: testString.padEnd(5, 'this'),
      expected: 'tthis',
    })
  }

  {
    const testString = 't'
    
    assert({
      given: 'string shorter than supplied targetLength + short padString',
      should: 'return correct string',
      actual: testString.padEnd(5, 't'),
      expected: 'ttttt',
    })
  }

  {
    const testString = 'testString'
    
    assert({
      given: 'string longer than supplied targetLength + padString',
      should: 'return original string',
      actual: testString.padEnd(5, 'this'),
      expected: 'testString',
    })
  }

  {
    const testString = ''
    
    assert({
      given: 'empty string + padString shorter than targetLength',
      should: 'return correct string',
      actual: testString.padEnd(5, 'this'),
      expected: 'thist',
    })
  }

  {
    const testString = ''
    
    assert({
      given: 'empty string + padString longer than targetLength',
      should: 'return correct string',
      actual: testString.padEnd(5, 'testthis'),
      expected: 'testt',
    })
  }

  {
    const testString = ''
    
    assert({
      given: 'empty string + padString equal length to targetLength',
      should: 'return correct string',
      actual: testString.padEnd(5, 'testt'),
      expected: 'testt',
    })
  }

  {
    const testString = 'test'
    
    assert({
      given: 'empty string + padString as number & targetLength as string',
      should: 'return correct string',
      actual: testString.padEnd('5', 6),
      expected: 'test6',
    })
  }

  {
    const testString = 'test'
    
    assert({
      given: 'empty string + undefined padString & targetLength',
      should: 'return original string',
      actual: testString.padEnd(undefined, undefined),
      expected: 'test',
    })
  }
})