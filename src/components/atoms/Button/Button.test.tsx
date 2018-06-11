import * as test from "tape";
import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import { Button } from './Button'

const render = ReactDOMServer.renderToStaticMarkup

test('Button', (t) => {
  {
    const $ = dom.load(render(<Button />))
    const message = 'given no props should render a button'
    const actual = $('.Button').length
    const expected = 1
    t.deepEqual(actual, expected, message)
  }
  {
    const props = { text: 'test' }
    const $ = dom.load(render(<Button {...props}/>))
    const message = 'given a text prop should render a button with correct text'
    const actual = $('.Button').text()
    const expected = 'test'
    t.deepEqual(actual, expected, message)
  }
  {
    const props = { loading: true, text: 'test' }
    const $ = dom.load(render(<Button {...props}/>))
    const message = 'given loading is true and a text prop should render a button with loading text'
    const actual = $('.Button').text()
    const expected = 'loading'
    t.deepEqual(actual, expected, message)
  }
  {
    const props = { loading: false, text: 'test' }
    const $ = dom.load(render(<Button {...props}/>))
    const message = 'given loading is false and a text prop should render a button with loading text'
    const actual = $('.Button').text()
    const expected = 'test'
    t.deepEqual(actual, expected, message)
  }
  t.end()
})
