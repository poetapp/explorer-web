import { isActiveFeatureName } from '@paralleldrive/feature-toggles'
import { Feature } from '@paralleldrive/react-feature-toggles'

import * as classNames from 'classnames'
import * as React from 'react'
import { browserHistory } from 'react-router'
import { Action } from 'redux'

import { AvatarMenu } from 'components/atoms/AvatarMenu/AvatarMenu'
import { Images } from 'images/Images'
import { User } from 'interfaces/Props'

import './Navbar.scss'

interface NavbarActions {
  readonly onSearchChange?: (searchQuery: string) => Action
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

const getSearchQuery = () => {
  const currentLocation = browserHistory.getCurrentLocation()

  if (currentLocation.pathname === '/works') return (currentLocation.query as any).query
}

export const Navbar = (props: NavbarProps & NavbarActions) => {
  const {
    user,
    displaySearch,
    displayLogo,
    onSearchChange,
    onSignOut,
    shadow,
    transparent,
    margin,
    searchShadow,
  } = props

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
              defaultValue={getSearchQuery()}
              onChange={(event: React.FormEvent<HTMLInputElement>) => onSearchChange(event.currentTarget.value)}
            />
          </form>
        </div>
      )}
      {user &&
        user.profile &&
        user.profile.createdAt && (
          <Feature>
            {({ features }) =>
              isActiveFeatureName('avatar', features) && (
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
