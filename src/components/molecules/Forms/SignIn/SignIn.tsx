import { Input } from 'components/atoms/Input/Input'
import { Form } from 'components/molecules/Form/Form'
import * as React from 'react'
import { Link } from 'react-router'

interface SignInProps {
  readonly onSubmit: (event: any) => any
  readonly disabledButton?: boolean
  readonly serverErrors?: any
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
    const { onSubmit, disabledButton } = this.props

    return (
      <div className={'SignIn'}>
        <Form
          buttonDisabled={disabledButton}
          onSubmit={onSubmit}
          signIn={true}
          header={'Need an Account?'}
          label={
            <p>
              Already have an accounts? <Link to={'/sign-in'}>Log In</Link>
            </p>
          }
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
      </div>
    )
  }
}
