import { Actions } from 'actions/index'
import { FrostState, StatusService } from 'interfaces/Props'
import * as React from 'react'
import { connect } from 'react-redux'

import { Login } from 'components/molecules/Login/Login'

interface DataFormSignIn {
  readonly email: string
  readonly password: string
}
interface DataFormSignUp extends DataFormSignIn {
  readonly confirmPassword: string
}

interface LoginContainerProps {
  readonly onSubmitSignUp?: (data: DataFormSignUp) => any
  readonly onSubmitSignIn?: (data: DataFormSignIn) => any
  readonly signIn: StatusService
  readonly signUp: StatusService
}

const mapStateToProps = (state: FrostState): LoginContainerProps => ({
  signIn: state.signIn,
  signUp: state.signUp,
})
const mapDispatchToProps = {
  onSubmitSignUp: Actions.SignUp.onSignUp,
  onSubmitSignIn: Actions.SignIn.onSignIn,
}
export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<LoginContainerProps, undefined> {
    readonly onSubmitSignIn = (data: DataFormSignIn): void => {
      const { onSubmitSignIn } = this.props
      onSubmitSignIn(data)
    }

    render(): JSX.Element {
      const { signIn, signUp } = this.props

      return <Login onSubmitSignIn={this.onSubmitSignIn} signIn={signIn} />
    }
  }
)
