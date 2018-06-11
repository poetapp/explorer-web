import * as React from 'react'

import { text, boolean, select } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { Button } from './Button'

storiesOf('Components/Buttons', module).addWithJSX(
  'Button',
  wInfo(`

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Button
    readonly className?: string
    readonly text?: string
    readonly disabled?: boolean
    readonly onClick?: any
    readonly type?: 'primary' | 'danger'
    />
  ~~~`)(() => (
    <Button
      className={text('className', '')}
      text={text('text', 'Test Button')}
      disabled={boolean('disabled', false)}
      type={select('type', { primary: 'primary', danger: 'danger' }, 'primary')}
      onClick={() => alert('clicked')}
    />
  ))
)
