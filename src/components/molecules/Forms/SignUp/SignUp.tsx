import * as classNames from 'classnames'
import { Input } from 'components/atoms/Input/Input'
import { InputPassword } from 'components/atoms/InputPassword/InputPassword'
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
        mutablePasswordInput.setCustomValidity(newProps.serverErrors.message)
        mutablePasswordInput.focus()
      }

      if (message.includes('The specified account already exists.')) {
        const { mutableEmailInput } = this
        mutableEmailInput.setCustomValidity(newProps.serverErrors.message)
        mutableEmailInput.focus()
      }

      this.mutableForm.reportValidity()
    }
  }

  readonly onValidate = (data: any, elements: any): boolean => {
    const { password, confirmPassword } = data

    if (password !== confirmPassword) {
      elements.confirmPassword.setCustomValidity(`Passwords Don't Match`)
      return false
    }

    return true
  }
  readonly onChangeRepeatPassword = (e: any, data: any, elements: any): void => {
    const value = e.target.value
    const { password, confirmPassword } = data

    if (value !== '' && password !== confirmPassword)
      elements.confirmPassword.setCustomValidity(`Passwords Don't Match`)

    if (password === confirmPassword) elements.confirmPassword.setCustomValidity('')

    if (value === '') elements.confirmPassword.setCustomValidity('')
  }

  readonly onChangeEmail = (e: any): void => {
    const input = e.target
    input.setCustomValidity('')
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
          <InputPassword
            name={'password'}
            type={'password'}
            label={'Password'}
            inputRef={(el: HTMLInputElement) => (this.mutablePasswordInput = el)}
            minLength={10}
            complexity={{
              lowerCase: 1,
              upperCase: 1,
              numeric: 1,
              symbol: 1,
            }}
            maxLength={30}
            required
          />
          <Input
            name={'confirmPassword'}
            type={'password'}
            label={'Repeat Password'}
            onChange={this.onChangeRepeatPassword.bind(this)}
            minLength={10}
            maxLength={30}
            required
          />
        </Form>
      </div>
    )
  }
}
