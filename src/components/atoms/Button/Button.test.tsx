import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { describe } from 'riteway'

import { Button } from './Button'

const render = ReactDOMServer.renderToStaticMarkup

describe('<Button {...props} />', async (should: any) => {
  const { assert } = should('render the correct button')
  {
    const $ = dom.load(render(<Button />))
    assert({
      given: 'no props',
      should: 'render a button with no text',
      actual: $('.Button').text(),
      expected: '',
    })
  }
  {
    const props = { className: 'test' }
    const $ = dom.load(render(<Button {...props} />))
    assert({
      given: 'className props',
      should: 'render a button with the className',
      actual: $('.test').length,
      expected: 1,
    })
  }
  {
    const props = { text: 'test' }
    const $ = dom.load(render(<Button {...props} />))
    assert({
      given: 'text prop',
      should: 'render button with the correct text',
      actual: $('.Button').text(),
      expected: 'test',
    })
  }
  {
    const props = { text: 'test', type: 'Google' }
    const $ = dom.load(render(<Button {...props} />))
    assert({
      given: 'type prop and text prop',
      should: 'render the button with the correct text',
      actual: $('.Button').text(),
      expected: 'test',
    })
  }
  {
    const props = { type: 'Google' }
    const $ = dom.load(render(<Button {...props} />))
    assert({
      given: 'type prop and no text prop',
      should: 'render the button with the correct text',
      actual: $('.Button').text(),
      expected: 'SIGN UP WITH GOOGLE',
    })
  }
})
