import * as React from 'react';

import { LandingLoggedOut } from './LandingLoggedOut';
import { LandingLoggedIn } from './LandingLoggedIn';

import './Layout.scss';

export interface LandingProps {
  loggedIn: boolean;
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
