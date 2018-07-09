import * as classNames from 'classnames'
import * as React from 'react'

import { configureFeature } from '@paralleldrive/react-feature-toggles'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { Action } from 'redux'

import { Actions } from 'actions'
import { Button } from 'components/atoms/Button/Button'
import { Images } from 'images/Images'

import './Navbar.scss'

interface NavbarActions {
  dispatchSearchChange: (searchQuery: string) => Action
}

export interface NavbarProps {
  readonly shadow?: boolean
  readonly transparent?: boolean
  readonly margin?: boolean
  readonly displayLogo?: boolean
  readonly displaySearch?: boolean
  readonly searchShadow?: boolean
  readonly location?: string
}

function mapStateToProps(state: any, ownProps: NavbarProps): NavbarProps {
  return {
    ...ownProps,
  }
}

const mapDispatch = {
  dispatchSearchChange: (query: string) => ({
    type: Actions.Search.Change,
    query,
  }),
}

interface UserButtonProps {
  readonly location?: string
}
class UserButtons extends React.Component<UserButtonProps, undefined> {
  render() {
    if (![''].includes(this.props.location)) return null
    return (
      <div className={'button'}>
        <Link to={'/login'}>
          <Button className={'navbar-login'} text={'Log In'} />
        </Link>
        <Link to={'/register'}>
          <Button className={'navbar-signup'} text={'Sign Up'} />
        </Link>
      </div>
    )
  }
}

const noop = () => <div>TEST</div>
const UserFeature = configureFeature(noop, 'landing-buttons', UserButtons)
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
          <UserButtons location={this.props.location} />
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
