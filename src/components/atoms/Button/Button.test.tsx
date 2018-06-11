import { Expect, Test } from 'alsatian'
import * as dom from 'cheerio'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import { Button } from './Button'

const render = ReactDOMServer.renderToStaticMarkup

export class ButtonTest {
  @Test("Button: Given no props : should render a button")
  public Button() {
    const $ = dom.load(render(<Button />))
    const result = $('.Button').length
    Expect(result).toBe(1);
  }
}
