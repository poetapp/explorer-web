import * as React from 'react';

import { Overview } from './Overview';
import { WorkTabs } from './WorkTabs';

import './Layout.scss';

export interface WorkProps {
  readonly id: string,
  readonly historical: boolean
}

export class WorkLayout extends React.Component<WorkProps, undefined> {

  render() {
    return (
      <section className="container page-work">
        <div className="row">
          <div className="col-xs-7">
            <Overview workId={this.props.id}/>
          </div>
        </div>
        <WorkTabs id={this.props.id}/>
      </section>
    )
  }

  componentWillUnmount() {
    document.title = 'Poet';
  }
  
}
