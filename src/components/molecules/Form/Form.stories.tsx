import * as React from 'react'

import { text, boolean } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'

import { Input } from 'components/atoms/Input/Input'
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
      buttonDisabled={false}
      signIn={true}
      className={''}
      header={'Log In'}
      label={'Need an Account?'}
      formRef={(el: HTMLFormElement) => (this.mutableForm = el)}
    >
      <Input
        type={'email'}
        label={'Email'}
        inputRef={(el: HTMLInputElement) => (this.mutableEmailInput = el)}
        onChange={this.onChangeEmail}
      />
      <Input type={'password'} label={'Password'} />
    </Form>
  ))
);
