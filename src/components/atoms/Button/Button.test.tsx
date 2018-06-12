import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { describe } from "riteway";

import { Button } from './Button'

const render = ReactDOMServer.renderToStaticMarkup

describe('<Button {...props} />', async (should: any) => {
  const { assert } = should('render the correct button');
  {
    const $ = dom.load(render(<Button />))
    assert({
    given: 'no props',
    should: 'render a button',
    actual: $('.Button').length,
    expected: 1
    });
  }
  {
    const props = { text: 'test'}
    const $ = dom.load(render(<Button {...props}/>))
    assert({
      given: 'text prop',
      should: 'render a button with test text',
      actual: $('.Button').text(),
      expected: 'test'
    });
  }
  {
    const props = { text: 'test', loading: true }
    const $ = dom.load(render(<Button {...props}/>))
    assert({
      given: 'text and true loading props',
      should: 'render a button with loading text',
      actual: $('.Button').text(),
      expected: 'loading'
    });
  }
  {
    const props = { text: 'test', loading: false }
    const $ = dom.load(render(<Button {...props}/>))
    assert({
    given: 'text and false loading props',
    should: 'render a button with test text',
    actual: $('.Button').text(),
    expected: 'test'
    });
  }
});
