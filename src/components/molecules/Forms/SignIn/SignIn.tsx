import * as classNames from 'classnames'
import * as React from 'react'

import { Link } from 'react-router'

import { Input } from 'components/atoms/Input/Input'
import { Form } from 'components/molecules/Form/Form'

import './SignIn.scss'

interface SignInProps {
  readonly onSubmit: (event: any) => any
  readonly disabledButton?: boolean
  readonly serverErrors?: any
  readonly className?: string
}

export class SignIn extends React.Component<SignInProps, undefined> {
  private mutableEmailInput: HTMLInputElement
  private mutableForm: HTMLFormElement

  componentWillReceiveProps(newProps: any): void {
    if (newProps.serverErrors.status) {
      const { message } = newProps.serverErrors
      if (message.includes('The specified resource does not exist.')) {
        this.mutableEmailInput.setCustomValidity(newProps.serverErrors.message)
        this.mutableEmailInput.focus()
      }

      this.mutableForm.reportValidity()
    }
  }

  readonly onChangeEmail = (e: any): void => {
    const input = e.target
    input.setCustomValidity('')
  }

  render(): JSX.Element {
    const { onSubmit, disabledButton, className } = this.props

    return (
      <div className={classNames('SignIn', className)}>
        <Form
          buttonDisabled={disabledButton}
          onSubmit={onSubmit}
          signIn={true}
          header={'Log In'}
          label={
            <p>
              Need an account? <Link to={'/register'}>Sign Up</Link>
            </p>
          }
          formRef={(el: HTMLFormElement) => (this.mutableForm = el)}
        >
          <Input
            className={'SignIn__input'}
            name={'email'}
            type={'email'}
            label={'Email'}
            inputRef={(el: HTMLInputElement) => (this.mutableEmailInput = el)}
            onChange={this.onChangeEmail}
          />
          <Input className={'SignIn__input'} name={'password'} type={'password'} label={'Password'} />
        </Form>
      </div>
    )
  }
}
