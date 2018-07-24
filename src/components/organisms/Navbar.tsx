import * as classNames from 'classnames'
import * as React from 'react'

import { Feature, isActive } from '@paralleldrive/react-feature-toggles'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Action } from 'redux'

import { Actions } from 'actions'
import { NavButtons } from 'components/molecules/NavButtons/NavButtons'
import { FeatureName } from 'config/features'
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
  readonly displayNavButtons?: boolean
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
          {this.props.displayNavButtons && (
            <Feature>{({ features }) => isActive(FeatureName.NavButtons, features) && <NavButtons />}</Feature>
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
