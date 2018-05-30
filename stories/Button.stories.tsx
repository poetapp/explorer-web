import { text, boolean } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { wInfo } from './index.stories'
import { Button } from '../src/components/atoms/Button/Button'

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
      className={text('className')}
      text={text('text', 'Test Button')}
      disabled={boolean('disabled', false)}
      type={text('type', 'primary')}
      onClick={() => alert('clicked')}
    />
  ))
)
