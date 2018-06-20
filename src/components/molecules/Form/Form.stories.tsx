import * as React from 'react'

import { text, boolean } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from 'stories/index.stories'
import { Form } from './Form'

storiesOf("Components/Forms", module).addWithJSX(
  "Form",
  wInfo(`

  ### Notes

  This is a form component. 

  ### Usage
  ~~~js
  <Form
    readonly className?: string
    readonly label?: string
    readonly children?: React.ReactNode
    readonly signIn?: boolean
    />
  ~~~`)(() => (
    <Form
      signIn={boolean('signIn', false)}
      className={text('className', '')}
      label={text("label", "Create your Po.et Account")}
      children={
        <p>
          Already Have an Account?<a target="_blank" href="#">
            Log in
          </a>
        </p>
      }
    />
  ))
);
