import * as React from 'react';

import { Overview } from './Overview';
import { ProfileTabs } from './Tabs';

import './Layout.scss';

export interface ProfileLayoutProps {
  readonly id: string;
  readonly sessionPublicKey: string;
}

export class ProfileLayout extends React.Component<ProfileLayoutProps, undefined> {
  render() {
    return (
      <section className="container">
        <div className="page-profile row">
          <Overview profileId={this.props.id} sessionPublicKey={this.props.sessionPublicKey}  />
          <ProfileTabs id={this.props.id} sessionPublicKey={this.props.sessionPublicKey} />
        </div>
      </section>
    );
  }
}
