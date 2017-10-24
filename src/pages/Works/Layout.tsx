import * as React from 'react';
import { Action } from 'redux';
import * as moment from 'moment';
import { LicenseType, LicenseTypes } from 'poet-js';

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
  readonly licenseType?: LicenseType;
}

export class WorksLayout extends React.Component<WorksLayoutProps & WorksLayoutActions, WorksLayoutState> {

  constructor() {
    super(...arguments);
    this.state = {
      licenseType: LicenseTypes[0],
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
          licenseType={this.state.licenseType}
          onDateFromChanged={dateFrom => this.setState({ dateFrom })}
          onDateToChanged={dateTo => this.setState({ dateTo })}
          onSortChange={sortBy => this.setState({ sortBy })}
          onLicenseTypeChange={licenseType => this.setState({ licenseType })}
        />
        <Works
          offset={parseInt(this.props.location.query.offset) || 0}
          onOffset={this.props.dispatchSearchOffsetChangeAction}
          sortBy={this.state.sortBy}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          query={this.props.location.query.query}
          licenseType={this.state.licenseType}
        />
      </section>
    )
  }

}
