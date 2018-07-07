import * as React from 'react'

import { SignUp } from 'components/molecules/Forms/SignUp/SignUp'
import { StatusService } from 'interfaces/Props'

interface SignUpProps {
  readonly onSubmitSignUp?: (data: object) => void
  readonly signUp: StatusService
}

export const SignUpWrapper = (props: SignUpProps) => {
  return (
    <SignUp onSubmit={props.onSubmitSignUp} disabledButton={props.signUp.loading} serverErrors={props.signUp.error} />
  )
}
