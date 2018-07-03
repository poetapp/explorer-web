import * as React from 'react'

import { SignIn } from 'components/molecules/Forms/SignIn/SignIn'
import { SignUp } from 'components/molecules/Forms/SignUp/SignUp'
import { StatusService } from 'interfaces/Props'

interface LoginProps {
  readonly onSubmitSignIn?: (data: object) => void
  readonly signIn: StatusService
}

export const Login = (props: LoginProps) => (
  <SignIn onSubmit={props.onSubmitSignIn} disabledButton={props.signIn.loading} serverErrors={props.signIn.error} />
)
