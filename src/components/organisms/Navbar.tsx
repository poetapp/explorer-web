import * as classNames from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Action } from 'redux'

import { Actions } from 'actions'
import { AvatarMenu } from 'components/atoms/AvatarMenu/AvatarMenu'
import { Images } from 'images/Images'
import { User, FrostState } from 'interfaces/Props'

import './Navbar.scss'

interface NavbarActions {
  dispatchSearchChange: (searchQuery: string) => Action
  readonly onSignOut?: () => Action
}

export interface NavbarProps {
  readonly shadow?: boolean
  readonly transparent?: boolean
  readonly margin?: boolean
  readonly displayLogo?: boolean
  readonly displaySearch?: boolean
  readonly searchShadow?: boolean
  readonly user?: User
}

function mapStateToProps(state: FrostState, ownProps: NavbarProps): NavbarProps {
  return {
    user: state.user,
    ...ownProps,
  }
}

const mapDispatch = {
  dispatchSearchChange: (query: string) => ({
    type: Actions.Search.Change,
    query,
  }),
  onSignOut: Actions.SignOut.onSignOut,
}

export const Navbar = (connect as any)(mapStateToProps, mapDispatch)(
  class extends React.Component<NavbarProps & NavbarActions, undefined> {
    static defaultProps: NavbarProps = {
      shadow: true,
      transparent: false,
      displayLogo: true,
      displaySearch: true,
    }

    render() {
      const navClasses = [
        'navbar',
        this.props.shadow && 'shadow',
        this.props.transparent && 'transparent',
        this.props.margin && 'margin',
      ]
      const searchClasses = ['search', this.props.searchShadow && 'shadow']

      return (
        <nav className={classNames(navClasses)}>
          {this.props.displayLogo && (
            <a className="navbar-brand" href="/">
              <img src={Images.Logo} />
            </a>
          )}
          {this.props.displaySearch && (
            <div className={classNames(searchClasses)}>
              <img src={Images.Glass} />
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  defaultValue={this.getSearchQuery()}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    this.props.dispatchSearchChange(event.currentTarget.value)
                  }
                />
              </form>
            </div>
          )}
          {this.props.user.profile.verified && (
            <div className="avatar">
              <AvatarMenu user={this.props.user} onSignOut={this.props.onSignOut} />
            </div>
          )}
        </nav>
      )
    }

    private getSearchQuery() {
      const currentLocation = browserHistory.getCurrentLocation()

      if (currentLocation.pathname === '/works') return (currentLocation.query as any).query
      else return ''
    }
  }
)
