import { Actions } from 'actions/index'
import { FrostState, StatusService } from 'interfaces/Props'
import * as React from 'react'
import { connect } from 'react-redux'

import { SignUpWrapper } from 'components/molecules/SignUp/SignUp'

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
export const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<SignUpContainerProps, undefined> {
    readonly onSubmitSignUp = (data: DataFormSignUp): void => {
      const { onSubmitSignUp } = this.props
      onSubmitSignUp(data)
    }

    render(): JSX.Element {
      const { signUp } = this.props

      return <SignUpWrapper onSubmitSignUp={this.onSubmitSignUp} signUp={signUp} />
    }
  }
)
