import * as React from 'react'

import { text, boolean, select } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { Input } from './Input'

storiesOf('Components/Forms', module).addWithJSX(
  'Input',
  wInfo(`

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Input
    readonly className?: string
    />
  ~~~`)(() => (
    <Input
      type={select(
        'type',
        {
          password: 'password',
          button: 'button',
          checkbox: 'checkbox',
          color: 'color',
          date: 'date',
          email: 'email',
          file: 'file',
          hidden: 'hidden',
          image: 'image',
          month: 'month',
          number: 'number',
          radio: 'radio',
          range: 'range',
          reset: 'reset',
          search: 'search',
          submit: 'submit',
          tel: 'tel',
        },
        'email'
      )}
      label={text('label', 'Email')}
      className={text('className', '')}
    />
  ))
)
