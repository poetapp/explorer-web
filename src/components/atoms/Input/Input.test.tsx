import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { describe } from "riteway";

import { Input } from './Input'

const render = ReactDOMServer.renderToStaticMarkup

describe('<Input {...props} />', async (should: any) => {
  const { assert } = should('render the correct button');
  {
    const $ = dom.load(render(<Input />))
    assert({
    given: 'no props',
    should: 'render an input',
    actual: $('.Input').length,
    expected: 1
    });
  }
  {
    const props = { className: 'test'}
    const $ = dom.load(render(<Input {...props}/>))
    assert({
    given: 'className props',
    should: 'render an input with the className',
    actual: $('.test').length,
    expected: 1
    });
  }
  {
    const props = { label: 'test'}
    const $ = dom.load(render(<Input {...props}/>))
    assert({
    given: 'label prop',
    should: 'render input with the correct label',
    actual: $('.Input__label').text(),
    expected: 'test'
    });
  }
  {
    const props = { type: 'email'}
    const $ = dom.load(render(<Input {...props}/>))
    assert({
    given: 'type prop',
    should: 'render the input with the correct type',
    actual: $('[type=email]').length,
    expected: 1
    });
  }
});
