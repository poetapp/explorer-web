import * as React from 'react';
import { Action } from 'redux';
import * as moment from 'moment';

import { Works } from './Works';
import { FiltersComponent } from './Filters';

import './Layout.scss';

interface WorksLayoutProps {
  readonly location?: {
    readonly query: {
      readonly query: string;
      readonly offset: string;
    }
  }
}

interface WorksLayoutActions {
  dispatchSearchOffsetChangeAction: (_: number) => Action;
}

export interface WorksLayoutState {
  readonly dateFrom?: moment.Moment;
  readonly dateTo?: moment.Moment;
  readonly sortBy?: string;
}

export class WorksLayout extends React.Component<WorksLayoutProps & WorksLayoutActions, WorksLayoutState> {

  constructor() {
    super(...arguments);
    this.state = {
      sortBy: 'datePublished'
    };
  }

  render() {
    return (
      <section className="page-works">
        <FiltersComponent
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          sortBy={this.state.sortBy}
          onDateFromChanged={dateFrom => this.setState({ dateFrom })}
          onDateToChanged={dateTo => this.setState({ dateTo })}
          onSortChange={sortBy => this.setState({ sortBy })}
        />
        <Works
          offset={parseInt(this.props.location.query.offset) || 0}
          onOffset={this.props.dispatchSearchOffsetChangeAction}
          sortBy={this.state.sortBy}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          query={this.props.location.query.query}
        />
      </section>
    )
  }

}
