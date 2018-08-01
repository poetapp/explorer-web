import * as React from 'react'
import { connect } from 'react-redux'

import { Actions } from 'actions/index'
import { User, FrostState } from 'interfaces/Props'

import { AvatarMenu } from '../atoms/AvatarMenu/AvatarMenu'

interface LogoutContainerProps {
  readonly user: User
  readonly onSignOut?: () => any
}

const mapStateToProps = (state: FrostState): LogoutContainerProps => ({
  user: state.user,
})

const mapDispatchToProps = {
  onSignOut: Actions.SignOut.onSignOut,
}

export const LogoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarMenu)
