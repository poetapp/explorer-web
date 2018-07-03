import * as React from 'react'

import { text, boolean, select } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { Button } from './Button'

storiesOf("Components/Buttons", module).addWithJSX(
  "Button",
  wInfo(`

  ### Notes

  This is a button.

  ### Usage
  ~~~js
  <Button
    readonly className?: string
    readonly text?: string
    readonly onClick?: any
    readonly type?: string
    readonly disabled?: boolean
    />
  ~~~`)(() => (
    <Button
      className={text("className", "")}
      text={text("text", "Test Button")}
      onClick={() => alert("clicked")}
      company={select("company", {
        primary: "primary",
        Google: "Google",
        Twitter: "Twitter",
        Facebook: "Facebook"
      })}
      signIn={boolean('signIn', false)}
      disabled={boolean('disabled', false)}
    />
  ))
);
