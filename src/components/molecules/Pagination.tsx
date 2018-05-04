import * as classNames from 'classnames'
import * as React from 'react'

import { ClassNameProps } from 'components/ClassNameProps'
import { Configuration } from 'configuration'

export interface PaginationProps extends ClassNameProps {
  readonly offset: number
  readonly limit: number
  readonly count: number
  readonly visiblePageCount?: number
  readonly onClick: (offset: number) => void
  readonly disabledClassName: string
}

export class Pagination extends React.Component<PaginationProps, undefined> {
  static defaultProps: Partial<PaginationProps> = {
    visiblePageCount: Configuration.pagination.visiblePageCount
  }

  render() {
    if (!this.props.count || this.props.count <= this.props.limit) return null

    return (
      <nav className={classNames(this.props.className)}>
        <ul>
          <li
            className={classNames(
              !this.canPrevious() && this.props.disabledClassName
            )}
            onClick={this.onPrevious.bind(this)}
          >
            &lt;
          </li>
          {this.pagesToDisplay().map(i => (
            <li
              key={i}
              onClick={() => this.props.onClick(i * this.props.limit)}
              className={classNames(i === this.selectedPage() && 'selected')}
            >
              {i + 1}
            </li>
          ))}
          <li
            onClick={this.onNext.bind(this)}
            className={classNames(
              !this.canNext() && this.props.disabledClassName
            )}
          >
            &gt;
          </li>
        </ul>
      </nav>
    )
  }

  private pagesToDisplay(): ReadonlyArray<number> {
    const totalPageCount = Math.ceil(this.props.count / this.props.limit)
    const maxVisiblePageCount = Math.min(
      this.props.visiblePageCount,
      totalPageCount
    )
    const selectedPage = this.selectedPage()

    const translate = (i: number) =>
      i +
      Math.min(
        Math.max(selectedPage - Math.floor(maxVisiblePageCount / 2), 0),
        totalPageCount - maxVisiblePageCount
      )

    return Array(maxVisiblePageCount)
      .fill(null)
      .map((e, i) => i)
      .map(translate)
  }

  private selectedPage() {
    return Math.ceil(this.props.offset / this.props.limit)
  }

  private canPrevious() {
    return !!this.props.offset
  }

  private canNext() {
    return this.props.offset + this.props.limit < this.props.count
  }

  private onPrevious() {
    if (this.canPrevious())
      this.props.onClick(this.props.offset - this.props.limit)
  }

  private onNext() {
    if (this.canNext()) this.props.onClick(this.props.offset + this.props.limit)
  }
}
