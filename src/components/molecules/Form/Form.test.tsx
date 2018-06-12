import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { describe } from "riteway";

import { Form } from './Form'

const render = ReactDOMServer.renderToStaticMarkup

describe('<Form {...props} />', async (should: any) => {
  const { assert } = should('render the correct button');
  {
    const $ = dom.load(render(<Form />))
    assert({
    given: 'no props',
    should: 'render a form',
    actual: $('.Form').length,
    expected: 1
    });
  }
  {
    const props = { className: 'test'}
    const $ = dom.load(render(<Form {...props}/>))
    assert({
    given: 'className props',
    should: 'render a form with the className',
    actual: $('.test').length,
    expected: 1
    });
  }
  {
    const props = { label: 'test label'}
    const $ = dom.load(render(<Form {...props}/>))
    assert({
    given: 'label prop',
    should: 'render form with the correct label',
    actual: $('.Form__header__label').text(),
    expected: 'test label'
    });
  }
  {
    const props = { text: 'test text'}
    const $ = dom.load(render(<Form {...props}/>))
    assert({
    given: 'text prop',
    should: 'render the form with the correct text',
    actual: $('.Form__header__text').text(),
    expected: 'test text'
    });
  }
});
