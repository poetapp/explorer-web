import { Expect, Test, TestCase } from 'alsatian'
import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import { Button } from './Button'

const render = ReactDOMServer.renderToStaticMarkup

export class ButtonTest {
  @Test("Button: Given no props : should render a button")
  @TestCase()
  public noProps(props: object) {
    const $ = dom.load(render(<Button />))
    const actual = $('.Button').length
    const expected = 1
    Expect(actual).toBe(expected);
  }

  @Test("Button: Given text prop : should render a button with the correct text")
  @TestCase({ text: 'test'}, 'test')
  public Props(props: object, expected: string) {
    const $ = dom.load(render(<Button {...props} />))
    const actual = $('.Button').text()
    Expect(actual).toBe(expected);
  }
}
