import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { Api, LicenseType, Headers } from 'poet-js';

import { Configuration } from '../../configuration';
import { PoetAPIResourceProvider } from '../../components/atoms/base/PoetApiResource';
import { WorkNameWithLink, AuthorWithLink } from '../../components/atoms/Work';
import { TimeElapsedSinceTimestamp } from '../../components/atoms/Claim';
import { Pagination } from '../../components/molecules/Pagination';

import './Works.scss';

type WorksResource = ReadonlyArray<Api.Works.Resource>;

export interface WorksProps {
  readonly offset?: number;
  readonly onOffset?: (offset: number) => void;
  readonly limit?: number;
  readonly dateFrom?: moment.Moment;
  readonly dateTo?: moment.Moment;
  readonly query?: string;
  readonly sortBy?: string;
  readonly licenseType?: LicenseType;
}

export class Works extends PoetAPIResourceProvider<WorksResource, WorksProps, undefined> {
  private lastFetchedWorks: WorksResource;
  private lastFetchedCount: number;

  static defaultProps: WorksProps = {
    limit: Configuration.pagination.limit
  };

  poetURL() {
    return Api.Works.url({
      offset: this.props.offset,
      limit: this.props.limit,
      dateFrom: this.props.dateFrom && this.props.dateFrom.toDate().getTime(),
      dateTo: this.props.dateTo && this.props.dateTo.toDate().getTime(),
      query: this.props.query,
      sortBy: this.props.sortBy,
      licenseType: this.props.licenseType && this.props.licenseType.id
    })
  }

  renderElement(works: WorksResource, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    return this.renderWorks(works, count);
  }

  renderLoading() {
    if (this.lastFetchedWorks)
      return this.renderWorks(this.lastFetchedWorks, this.lastFetchedCount, true);

    return (
      <section className="works-results container loading no-content">
        <p>Loading, please wait...</p>
      </section>
    )
  }

  componentDidFetch(works: WorksResource, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    this.lastFetchedWorks = works;
    this.lastFetchedCount = count;
  }

  private renderWorks(works: WorksResource, count: number, isLoading?: boolean) {
    return (
      <section className={classNames('works container', isLoading && 'loading')}>
        <h4 className="work-count">Showing {works.length} of {count} Results</h4>
        <div className="row">
          <div className="col-md-8">
            <ul className="works">
              { works.map(this.renderWork, this) }
            </ul>
          </div>
        </div>
        <Pagination
          className="pagination"
          offset={this.props.offset}
          limit={this.props.limit}
          count={count}
          onClick={this.props.onOffset}
          disabledClassName="disabled"
        />
      </section>
    )
  }

  private renderWork(props: Api.Works.Resource) {
    return (
      <li key={props.id} className="work-item">
        <div className="name"><WorkNameWithLink work={props} /></div>
        <div className="info">
          <span className="timestamp">Timestamped <TimeElapsedSinceTimestamp claimInfo={props.claimInfo} />&nbsp;</span>
          <span className="author">by <AuthorWithLink work={props}/> </span>
        </div>
        <div className="content">
          <pre>
            {props.attributes.content.substr(0, 500)}...
          </pre>
        </div>
      </li>
    )
  }

}