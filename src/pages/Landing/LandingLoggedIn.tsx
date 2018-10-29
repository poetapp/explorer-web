import * as React from 'react'
import { connect } from 'react-redux'

import { Images } from 'images/Images'

import './LandingLoggedIn.scss'

interface LandingProps {}

interface LandingState {}

const mapDispatch = {}

export const LandingLoggedIn = connect(
  () => ({}),
  mapDispatch,
)(
  class extends React.Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
      super(props)
      this.state = {
        searchQuery: '',
      }
    }

    render() {
      return (
        <section className="landing-logged-in">
          <div className="container">
            <img className="logo" src={Images.Logo} />
            <section className="search" />
          </div>
        </section>
      )
    }
  },
)
