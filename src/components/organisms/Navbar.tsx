import { Feature, isActive } from '@paralleldrive/react-feature-toggles'
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
      const {
        user,
        displaySearch,
        displayLogo,
        dispatchSearchChange,
        onSignOut,
        shadow,
        transparent,
        margin,
        searchShadow,
      } = this.props
      const { profile } = user

      const navClasses = ['navbar', shadow && 'shadow', transparent && 'transparent', margin && 'margin']
      const searchClasses = ['search', searchShadow && 'shadow']
      return (
        <nav className={classNames(navClasses)}>
          {displayLogo && (
            <a className="navbar-brand" href="/">
              <img src={Images.Logo} />
            </a>
          )}
          {displaySearch && (
            <div className={classNames(searchClasses)}>
              <img src={Images.Glass} />
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  defaultValue={this.getSearchQuery()}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    dispatchSearchChange(event.currentTarget.value)
                  }
                />
              </form>
            </div>
          )}
          {user &&
            profile.createdAt && (
              <Feature>
                {({ features }) =>
                  isActive('avatar', features) && (
                    <div className="avatar">
                      <AvatarMenu user={user} onSignOut={onSignOut} />
                    </div>
                  )
                }
              </Feature>
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
