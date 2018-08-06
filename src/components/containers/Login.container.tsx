import * as React from 'react'
import { connect } from 'react-redux'

import { Actions } from 'actions/index'
import { SignIn } from 'components/molecules/Forms/SignIn/SignIn'
import { FrostState, StatusService } from 'interfaces/Props'

interface DataFormSignIn {
  readonly email: string
  readonly password: string
}

interface LoginContainerProps {
  readonly onSubmitSignIn?: (data: DataFormSignIn) => any
  readonly signIn: StatusService
}

const mapStateToProps = (state: FrostState): LoginContainerProps => ({
  signIn: state.signIn,
})

const mapDispatchToProps = { onSubmitSignIn: Actions.SignIn.onSignIn }

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ signIn: { loading, error }, onSubmitSignIn }: LoginContainerProps) => (
  <SignIn onSubmit={onSubmitSignIn} disabledButton={loading} serverErrors={error} />
))
