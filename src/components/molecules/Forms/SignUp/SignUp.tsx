import * as classNames from 'classnames'
import { Input } from 'components/atoms/Input/Input'
import { Form } from 'components/molecules/Form/Form'
import * as React from 'react'
import { Link } from 'react-router'

interface SignUpProps {
  readonly onSubmit: (event: any) => any
  readonly disabledButton?: boolean
  readonly serverErrors?: any
  readonly className?: string
}

export class SignUp extends React.Component<SignUpProps, undefined> {
  private mutableEmailInput: HTMLInputElement
  private mutablePasswordInput: HTMLInputElement
  private mutableForm: HTMLFormElement

  componentWillReceiveProps(newProps: any): void {
    if (newProps.serverErrors.status) {
      const { message } = newProps.serverErrors

      if (message.includes('Password Requirements')) {
        const { mutablePasswordInput } = this
        mutablePasswordInput.focus()
      }

      if (message.includes('The specified account already exists.')) {
        const { mutableEmailInput } = this
        mutableEmailInput.focus()
      }

      this.mutableForm.reportValidity()
    }
  }
  readonly onValidate = (data: any, elements: any): boolean => {
    const { password, confirmPassword } = data

    if (password !== confirmPassword) return false
    return true
  }

  readonly onChangeEmail = (e: any): void => {
    const input = e.target
  }

  render(): JSX.Element {
    const { onSubmit, disabledButton, className } = this.props

    return (
      <div className={classNames('SignUp', className)}>
        <Form
          buttonDisabled={disabledButton}
          onSubmit={onSubmit}
          header={'Sign Up'}
          onValidate={this.onValidate}
          label={
            <p>
              Already have an account? <Link to={'/login'}>Log In</Link>
            </p>
          }
          formRef={(el: HTMLFormElement) => (this.mutableForm = el)}
        >
          <Input
            name={'email'}
            type={'email'}
            label={'Email'}
            inputRef={(el: HTMLInputElement) => (this.mutableEmailInput = el)}
            onChange={this.onChangeEmail}
          />
          <Input
            name={'password'}
            type={'password'}
            label={'Password'}
            inputRef={(el: HTMLInputElement) => (this.mutablePasswordInput = el)}
            minLength={10}
            maxLength={30}
            required
          />
          <Input
            name={'confirmPassword'}
            type={'password'}
            label={'Repeat Password'}
            minLength={10}
            maxLength={30}
            required
          />
        </Form>
      </div>
    )
  }
}
