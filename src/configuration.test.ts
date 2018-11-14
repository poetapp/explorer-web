import { describe } from 'riteway'
import { camelCaseToScreamingSnakeCase, createEnvToConfigurationKeyMap, getConfigurationWithDefaults, defaultConfiguration } from './configuration'

describe('camelCaseToScreamingSnakeCase()', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return an empty string',
    actual: camelCaseToScreamingSnakeCase(),
    expected: '',
  })

  assert({
    given: 'empty string',
    should: 'return an empty string',
    actual: camelCaseToScreamingSnakeCase(''),
    expected: '',
  })

  assert({
    given: 'lowercase string',
    should: 'return an UPPERCASE string',
    actual: camelCaseToScreamingSnakeCase('test'),
    expected: 'TEST',
  })

  assert({
    given: 'camelCase string',
    should: 'return SCREAMING_SNAKE_CASE string',
    actual: camelCaseToScreamingSnakeCase('testCaseString'),
    expected: 'TEST_CASE_STRING',
  })
})

describe('createEnvToConfigurationKeyMap()', async (assert) => {
  assert({
    given: 'empty array',
    should: 'return empty object',
    actual: createEnvToConfigurationKeyMap([]),
    expected: {},
  })

  {
    const defaultConfiguration = ['frostApiUrl', 'testUrl']

    assert({
      given: 'array with cammelCase values',
      should: 'return object with ScreamingSnakeCase keys and equal cammelCase values',
      actual: createEnvToConfigurationKeyMap(defaultConfiguration),
      expected: {
        FROST_API_URL: 'frostApiUrl',
        TEST_URL: 'testUrl',
      },
    })
  }
})


describe('src/Configuration', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return the default config',
    actual: getConfigurationWithDefaults(),
    expected: defaultConfiguration,
  })

  {
    const stringOverride = { FROST_API_URL: 'one' }

    assert({
      given: 'a string override',
      should: 'return a config containing the string value',
      actual: getConfigurationWithDefaults(stringOverride),
      expected: {
        ...defaultConfiguration,
        frostApiUrl: 'one',
      },
    })
  }

  {
    const numberOverride = { FROST_API_URL: '10' }

    assert({
      given: 'a numerical value as a string override',
      should: 'return a config containing the numeric value',
      actual: getConfigurationWithDefaults(numberOverride),
      expected: { ...defaultConfiguration, frostApiUrl: 10 },
    })
  }
})