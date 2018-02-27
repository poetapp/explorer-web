import * as React from 'react'

import { LandingLoggedIn } from './LandingLoggedIn'

import './Layout.scss'

export interface LandingProps {
}

export class LandingLayout extends React.Component<LandingProps, undefined> {
  render() {
    return (
      <div className="landing">
        <LandingLoggedIn/>
      </div>
    )
  }
}
