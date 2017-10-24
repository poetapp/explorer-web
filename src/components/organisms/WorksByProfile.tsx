import * as React from 'react';
import { browserHistory } from 'react-router';
import * as classNames from 'classnames';
import { Api, Headers } from 'poet-js';

import { Images } from '../../images/Images';
import { Configuration } from '../../configuration';
import { DispatchesTransferRequested } from '../../actions/requests';
import { PoetAPIResourceProvider } from '../atoms/base/PoetApiResource';
import { WorkNameWithLink, WorkType } from '../atoms/Work';
import { SelectWorksByOwner } from '../atoms/Arguments';
import { Hash } from '../atoms/Hash';
import { Pagination } from '../molecules/Pagination';
import { DropdownMenu } from '../DropdownMenu';

import './WorksByProfile.scss';
import { TimeElapsedSinceTimestamp } from '../atoms/Claim';

const EDIT = 'Edit';
const TRANSFER = 'Transfer';

export type WorkToProfileRelationship = 'author' | 'owner' | 'relatedTo' | 'licensedTo';

interface WorksByProfileProps extends SelectWorksByOwner, DispatchesTransferRequested {
  readonly relationship: WorkToProfileRelationship;
  readonly searchQuery: string;
  readonly showActions?: boolean;
  readonly limit?: number;
}

interface WorksByProfileState {
  readonly offset?: number;
}

export class WorksByProfile extends PoetAPIResourceProvider<ReadonlyArray<Api.Works.Resource>, WorksByProfileProps, WorksByProfileState> {
  private lastFetchedWorks: ReadonlyArray<Api.Works.Resource>;
  private lastFetchedCount: number;

  static defaultProps: Partial<WorksByProfileProps> = {
    limit: Configuration.pagination.limit
  };

  constructor() {
    super(...arguments);
    this.state = {
      offset: 0
    }
  }

  poetURL() {
    return Api.Works.url({
      [this.props.relationship]: this.props.owner,
      limit: this.props.limit,
      offset: this.state.offset,
      query: this.props.searchQuery
    })
  }

  componentWillReceiveProps(props: WorksByProfileProps) {
    if (this.props.relationship !== props.relationship)
      this.setState({ offset: 0 })
  }

  renderElement(works: ReadonlyArray<Api.Works.Resource>, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));

    if (!count)
      return this.renderNoWorks();
    else
      return this.renderWorks(works, count);

  }

  renderLoading() {
    return this.renderWorks(this.lastFetchedWorks, this.lastFetchedCount, true);
  }

  componentDidFetch(works: ReadonlyArray<Api.Works.Resource>, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));

    this.lastFetchedWorks = works;
    this.lastFetchedCount = count;
  }

  private renderWorks(works: ReadonlyArray<Api.Works.Resource>, count: number, isLoading?: boolean) {
    return (
      <section className={classNames('works-by-profile', isLoading && 'loading', !works && 'no-content')}>
        <table className="works">
          <thead>
          <tr>
            <td>Name</td>
            <td>Hash</td>
            <td>Timestamp</td>
            { this.props.showActions && <td>Actions</td> }
          </tr>
          </thead>
          <tbody>
          {
            isLoading && !works
              ? <tr><td colSpan={this.props.showActions ? 4 : 3}><img src={Images.Quill} /></td></tr>
              : works.map(this.renderWork, this)
          }
          </tbody>
        </table>

        <Pagination
          offset={this.state.offset}
          limit={this.props.limit}
          count={count}
          visiblePageCount={Configuration.pagination.visiblePageCount}
          onClick={this.onOffset}
          className="pagination"
          disabledClassName="disabled"/>
      </section>
    )
  }

  private renderWork(work: Api.Works.Resource) {
    return (
      <tr key={work.id}>
        <td className="name">
          <WorkNameWithLink work={work} />
          <div>
            <span className="media-type">
              { work.attributes.mediaType }
              { work.attributes.articleType && ` / ${work.attributes.articleType}`}
            </span>
            <span className="content-info">
              {work.attributes.wordCount && <span>{work.attributes.wordCount} word{parseInt(work.attributes.wordCount) > 1 && 's'} {work.attributes.fileSize && 'at '}</span>}
              {work.attributes.fileSize && <span>{work.attributes.fileSize} bytes</span>}
            </span>
          </div>
          <WorkType work={work} />
        </td>
        <td className="hash"><Hash className="copyable-hash-no-button" textClickable>{work.id}</Hash></td>
        <td className="timestamp"><TimeElapsedSinceTimestamp claimInfo={work.claimInfo}/></td>
        { this.props.showActions && <td>
          <DropdownMenu
            className="dropdown"
            options={[EDIT, TRANSFER]}
            onOptionSelected={this.optionSelected.bind(this, work)}>
            Actions
          </DropdownMenu>
        </td> }
      </tr>
    )
  }

  private renderNoWorks() {
    return (
      <section>{ this.props.children || (!this.props.searchQuery ? 'No works to show' : 'No works match the given criteria') }</section>
    )
  }

  private onOffset = (offset: number) => this.setState({ offset });

  private optionSelected(work: Api.Works.Resource, action: string) {
    switch (action) {
      case EDIT:
        browserHistory.push('/works/' + work.id + '/edit');
        return;
      case TRANSFER:
        this.props.transferRequested(work.id);
        return;
    }
  }

}
