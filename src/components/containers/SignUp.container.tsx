import * as React from 'react'
import { connect } from 'react-redux'

import { Actions } from 'actions/index'
import { SignUp } from 'components/molecules/Forms/SignUp/SignUp'
import { FrostState, StatusService } from 'interfaces/Props'

interface DataFormSignUp {
  readonly email: string
  readonly password: string
  readonly confirmPassword?: string
}

interface SignUpContainerProps {
  readonly onSubmitSignUp?: (data: DataFormSignUp) => any
  readonly signUp: StatusService
}

const mapStateToProps = (state: FrostState): SignUpContainerProps => ({
  signUp: state.signUp,
})
const mapDispatchToProps = {
  onSubmitSignUp: Actions.SignUp.onSignUp,
}

export const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ signUp: { loading, error }, onSubmitSignUp }: SignUpContainerProps) => (
  <SignUp onSubmit={onSubmitSignUp} disabledButton={loading} serverErrors={error} />
))
