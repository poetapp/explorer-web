import * as classNames from 'classnames'
import { Api } from 'helpers/PoetApi'
import * as React from 'react'

import { DispatchesTransferRequested } from 'actions/requests'
import { SelectWorksByOwner } from 'components/atoms/Arguments'
import { TimeElapsedSinceCreation } from 'components/atoms/Claim'
import { Hash } from 'components/atoms/Hash'
import { WorkNameWithLink, WorkType } from 'components/atoms/Work'
import { PoetAPIResourceProvider } from 'components/atoms/base/PoetApiResource'
import { Pagination } from 'components/molecules/Pagination'
import { Configuration } from 'configuration'
import { Images } from 'images/Images'

import './WorksByProfile.scss'

interface WorksByProfileProps
  extends SelectWorksByOwner,
    DispatchesTransferRequested {
  readonly searchQuery: string
  readonly showActions?: boolean
  readonly limit?: number
}

interface WorksByProfileState {
  readonly offset?: number
}

export class WorksByProfile extends PoetAPIResourceProvider<
  ReadonlyArray<Api.WorksByFilters.Response>,
  WorksByProfileProps,
  WorksByProfileState
> {
  static defaultProps: Partial<WorksByProfileProps> = {
    limit: Configuration.pagination.limit
  }

  private lastFetchedWorks: ReadonlyArray<Api.WorksByFilters.Response>
  private lastFetchedCount: number

  constructor(props: any) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  poetURL() {
    return Api.WorksByFilters.url({
      limit: this.props.limit,
      offset: this.state.offset,
      query: this.props.searchQuery
    })
  }

  componentWillReceiveProps(props: WorksByProfileProps) {
    // if (this.props.relationship !== props.relationship)
    //   this.setState({ offset: 0 })
  }

  renderElement(
    works: ReadonlyArray<Api.WorksByFilters.Response>,
    headers: Headers
  ) {
    const count =
      headers.get(Api.Headers.TotalCount) &&
      parseInt(headers.get(Api.Headers.TotalCount), 10)

    if (!count) return this.renderNoWorks()
    else return this.renderWorks(works, count)
  }

  renderLoading() {
    return this.renderWorks(this.lastFetchedWorks, this.lastFetchedCount, true)
  }

  componentDidFetch(
    works: ReadonlyArray<Api.WorksByFilters.Response>,
    headers: Headers
  ) {
    const count =
      headers.get(Api.Headers.TotalCount) &&
      parseInt(headers.get(Api.Headers.TotalCount), 10)

    this.lastFetchedWorks = works
    this.lastFetchedCount = count
  }

  private renderWorks(
    works: ReadonlyArray<Api.WorksByFilters.Response>,
    count: number,
    isLoading?: boolean
  ) {
    return (
      <section
        className={classNames(
          'works-by-profile',
          isLoading && 'loading',
          !works && 'no-content'
        )}
      >
        <table className="works">
          <thead>
            <tr>
              <td>Name</td>
              <td>Hash</td>
              <td>Timestamp</td>
              {this.props.showActions && <td>Actions</td>}
            </tr>
          </thead>
          <tbody>
            {isLoading && !works ? (
              <tr>
                <td colSpan={this.props.showActions ? 4 : 3}>
                  <img src={Images.Quill} />
                </td>
              </tr>
            ) : (
              works.map(this.renderWork, this)
            )}
          </tbody>
        </table>

        <Pagination
          offset={this.state.offset}
          limit={this.props.limit}
          count={count}
          visiblePageCount={Configuration.pagination.visiblePageCount}
          onClick={this.onOffset}
          className="pagination"
          disabledClassName="disabled"
        />
      </section>
    )
  }

  private renderWork(work: Api.WorksByFilters.Response) {
    return (
      <tr key={work.id}>
        <td className="name">
          <WorkNameWithLink work={work} />
          <div>
            <span className="media-type">
              {work.attributes.mediaType}
              {work.attributes.articleType &&
                ` / ${work.attributes.articleType}`}
            </span>
            <span className="content-info">
              {work.attributes.wordCount && (
                <span>
                  {work.attributes.wordCount} word{parseInt(
                    work.attributes.wordCount,
                    10
                  ) > 1 && 's'}{' '}
                  {work.attributes.fileSize && 'at '}
                </span>
              )}
              {work.attributes.fileSize && (
                <span>{work.attributes.fileSize} bytes</span>
              )}
            </span>
          </div>
          <WorkType work={work} />
        </td>
        <td className="hash">
          <Hash className="copyable-hash-no-button" textClickable>
            {work.id}
          </Hash>
        </td>
        <td className="timestamp">
          <TimeElapsedSinceCreation claim={work} />
        </td>
      </tr>
    )
  }

  private renderNoWorks() {
    return (
      <section>
        {this.props.children ||
          (!this.props.searchQuery
            ? 'No works to show'
            : 'No works match the given criteria')}
      </section>
    )
  }

  private onOffset = (offset: number) => this.setState({ offset })
}
