import * as React from 'react';

import './LandingLoggedOut.scss';

import LatestWorks from '../../components/molecules/LatestWorks';
import { Reviews } from './Reviews';
import { Partners } from './Partners';
import { WorksCounter, BlocksCounter } from '../../components/atoms/Work';

export interface LandingProps {
}

export class LandingLoggedOut extends React.Component<LandingProps, undefined> {
  render() {
    return (
      <section className="landing-logged-out">
        <div className="container">
          <h1>Poet is a platform for managing <br/> timestamped intellectual property</h1>
          <h2>Built on the bitcoin blockchain, the most secure globally verifiable
          <br/> record of human history the world has ever seen</h2>
          <div className="cta-header">
            <button className="button-secondary">Learn more</button>
          </div>
          <section className="row landing-boxes">
            <section className="col-sm-4 boxed">
              <div className="number">
                <BlocksCounter />
              </div>
              <div className="explain">Poet Blocks</div>
            </section>
            <section className="col-sm-4 boxed">
              <div className="number">$1,000,000</div>
              <div className="explain">Amount Raised</div>
            </section>
            <section className="col-sm-4 registered boxed">
              <div className="number">
                <WorksCounter />
              </div>
              <div className="explain">Creative Works Registered</div>
            </section>
          </section>
          <div>
            <LatestWorks limit={10} />
          </div>
          <Reviews/>
          <Partners/>
        </div>
        <section className="call-to-action-placeholder">
          <div className="container">
            <h1>Another headline and a call to action</h1>
            <h2>But not sure what we want to emphasize here</h2>
            <div>
              <button className="button-primary">Primary Button</button>
              <button className="button-secondary">Secondary Button</button>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
