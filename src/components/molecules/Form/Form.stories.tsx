import * as React from 'react'

import { text } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { Form } from './Form'

storiesOf('Components/Forms', module).addWithJSX(
  'Form',
  wInfo(`

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Form
    readonly className?: string
    readonly
    />
  ~~~`)(() => (
      <Form
        label={text('label', 'Create your Po.et Account')}
        children={<p>Already Have an Account?<a target="_blank" href='#'>Log in</a></p>}
      />
    ))
)
