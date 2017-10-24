import * as React from 'react';
import { Link, browserHistory } from 'react-router';
import { Action } from 'redux';
import { connect } from "react-redux";
import * as classNames from 'classnames';

import { Actions } from '../../actions/index';
import Constants from '../../constants';
import { Images } from '../../images/Images';
import { AccountDropdown } from './AccountDropdown';

import './Navbar.scss';

interface NavbarActions {
  dispatchSearchChange: (searchQuery: string) => Action
  dispatchShowTryItOut: () => Action
}

export interface NavbarProps {
  readonly loggedIn?: boolean;
  readonly shadow?: boolean;
  readonly transparent?: boolean;
  readonly margin?: boolean;
  readonly displayLogo?: boolean;
  readonly currentUser?: any;
  readonly displaySearch?: boolean;
  readonly searchShadow?: boolean;
}

function mapStateToProps(state: any, ownProps: NavbarProps): NavbarProps {
  return {
    ...ownProps,
    loggedIn: state.session && (state.session.state === Constants.LOGGED_IN),
    currentUser: state.session && (state.session.state === Constants.LOGGED_IN) && state.profile
  }
}

const mapDispatch = {
  dispatchSearchChange: (query: string) => ({ type: Actions.Search.Change, query }),
  dispatchShowTryItOut: () => ({ type: Actions.Modals.TryItOut.Show })
};

export const Navbar = (connect as any)(mapStateToProps, mapDispatch)(
  class extends React.Component<NavbarProps & NavbarActions, undefined> {

    static defaultProps: NavbarProps = {
      shadow: true,
      transparent: false,
      displayLogo: true,
      displaySearch: true
    };

    render() {
      const navClasses = [
        'navbar',
        this.props.shadow && 'shadow',
        this.props.transparent && 'transparent',
        this.props.margin && 'margin'
      ];
      const searchClasses = [
        'search',
        this.props.searchShadow && 'shadow'
      ];

      return (
        <nav className={classNames(navClasses)}>
          { this.props.displayLogo && <a className="navbar-brand" href="/"><img src={Images.Logo} /></a> }
          { this.props.displaySearch && <div className={classNames(searchClasses)}  >
            <img src={Images.Glass} />
            <form>
              <input
                type="text"
                placeholder="Search"
                defaultValue={this.getSearchQuery()}
                onChange={(event: React.FormEvent<HTMLInputElement>) => this.props.dispatchSearchChange(event.currentTarget.value) }
              />
            </form>
          </div> }
          <ul className="navbar-nav">
            { this.props.loggedIn ? this.renderLoggedInActions() : this.renderNotLoggedInActions() }
          </ul>
        </nav>
      )
    }

    private renderNotLoggedInActions(): JSX.Element[] {
      return [
        this.renderNavLink('login', 'Login', 'login-button button-secondary'),
        <li key='try-it-out'>
          <button className="try-it-out" onClick={this.props.dispatchShowTryItOut}>
            <img src={Images.QuillInverted} /><span>Try It Out</span>
          </button>
        </li>
      ];
    }

    private renderLoggedInActions(): JSX.Element[] {
      return [
        <li key="avatar" className="nav-item avatar"><AccountDropdown /></li>,
        <li key="create-work" className="nav-item"><Link to={'/create-work'} className="button-primary"><img src={Images.QuillInverted} />Register New Work</Link></li>
      ];
    }

    private renderNavLink(key: string, text: string, className: string = 'nav-link'): JSX.Element {
      return (
        <li key={key} className="nav-item">
          <Link to={'/' + key} className={className}>{text}</Link>
        </li>
      )
    }

    private getSearchQuery() {
      const currentLocation = browserHistory.getCurrentLocation();

      if (currentLocation.pathname === '/works')
        return (currentLocation.query as any).query;
      else
        return '';
    }

  }
);