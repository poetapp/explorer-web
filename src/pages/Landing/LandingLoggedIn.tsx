import * as React from 'react'
import { connect } from 'react-redux'

import { Images } from 'images/Images'

import { Actions } from 'actions'
import { WorkSearchAction } from 'sagas/NavbarSaga'
import LatestWorks from 'components/molecules/LatestWorks'

import './LandingLoggedIn.scss'

interface LandingProps {
  dispatchSearchSubmit?: (query: string) => WorkSearchAction,
}

interface LandingState {
  readonly searchQuery: string;
}

const mapDispatch = {
  dispatchSearchSubmit: (query: string) => ({ type: Actions.Search.Change, query })
};

export const LandingLoggedIn = connect(() => ({}), mapDispatch)(
  class extends React.Component<LandingProps, LandingState> {

    constructor() {
      super(...arguments);
      this.state = {
        searchQuery: ''
      }
    }

    render() {
      return (
        <section className="landing-logged-in">
          <div className="container">
            <img className="logo" src={Images.Logo} />
            <section className="search">
              <form onSubmit={this.onSearchSubmit} >
                <div><input type="text" onChange={this.onSearchChange} value={this.state.searchQuery} /></div>
                <div><button>Poet Search</button></div>
              </form>
            </section>
          </div>
          <section className="latest-blocks-and-works">
            <div className="container">
              <LatestWorks showLink={true} />
            </div>
          </section>
        </section>
      )
    }

    private onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      this.props.dispatchSearchSubmit(this.state.searchQuery);
    };

    private onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
      this.setState({ searchQuery: event.currentTarget.value })
    }

  }
);