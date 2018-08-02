import { connect } from 'react-redux'
import { Action } from 'redux'

import { Actions } from 'actions'
import { User, FrostState } from 'interfaces/Props'

import { Navbar } from '../molecules/Navbar/Navbar'

export interface NavbarContainerProps {
  readonly shadow?: boolean
  readonly transparent?: boolean
  readonly margin?: boolean
  readonly displayLogo?: boolean
  readonly displaySearch?: boolean
  readonly searchShadow?: boolean
}

export interface LogoutProps {
  readonly user?: User
  readonly onSignOut?: () => Action
}

const mapStateToProps = (
  state: FrostState,
  ownProps: NavbarContainerProps & LogoutProps
): NavbarContainerProps & LogoutProps => ({
  user: state.user,
  ...ownProps,
})

const mapDispatchToProps = {
  dispatchSearchChange: (query: string) => ({
    type: Actions.Search.Change,
    query,
  }),
  onSignOut: Actions.SignOut.onSignOut,
}

export const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
