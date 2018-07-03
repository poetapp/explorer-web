import { Actions } from 'actions/index'
import { FrostState, StatusService } from 'interfaces/Props'
import * as React from 'react'
import { connect } from 'react-redux'

import { Login } from 'components/molecules/Login/Login'

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

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<LoginContainerProps, undefined> {
    readonly onSubmitSignIn = (data: DataFormSignIn): void => {
      const { onSubmitSignIn } = this.props
      onSubmitSignIn(data)
    }

    render(): JSX.Element {
      const { signIn } = this.props

      return <Login onSubmitSignIn={this.onSubmitSignIn} signIn={signIn} />
    }
  }
)
