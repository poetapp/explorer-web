import classnames from 'classnames'
import React from 'react'

import { ofNumbers } from 'helpers/array'

import classNames from './Pagination.scss'

export const PaginationWrapper = ({ children, ...props }) => (
  <section>
    <Pagination {...props} />
    { children }
    <Pagination {...props} />
  </section>
)

export const Pagination = ({ pageCount = 10, value, onChange, maxVisiblePageCount = 10 }) => {
  if (!pageCount)
    return null

  const visiblePageCount = Math.min(pageCount, maxVisiblePageCount)
  const offset = Math.max(Math.min(pageCount - maxVisiblePageCount, value - maxVisiblePageCount / 2), 0)

  return (
    <section className={classNames.pagination}>
      <FirstPageButton
        value={value}
        maxVisiblePageCount={maxVisiblePageCount}
        onClick={onChange}
      />
      { ofNumbers(visiblePageCount, offset).map(page =>
        <Button
          page={page}
          key={`key${page}`}
          onClick={onChange}
          isSelected={value === page}
        />
      ) }
      <LastPageButton
        value={value}
        maxVisiblePageCount={maxVisiblePageCount}
        pageCount={pageCount}
        onClick={onChange}
      />
    </section>
  )
}

const Button = ({ page, onClick, isSelected = false }) => (
  <button
    onClick={() => onClick(page)}
    className={classnames({[classNames.selected]: isSelected})}
  >
    { page + 1 }
  </button>
)

const FirstPageButton = ({ value, maxVisiblePageCount, onClick }) =>
  value > maxVisiblePageCount / 2 && <Button page={0} onClick={onClick} />

const LastPageButton = ({ value, maxVisiblePageCount, pageCount, onClick }) =>
  value < pageCount - maxVisiblePageCount / 2 && <Button page={pageCount - 1} onClick={onClick} />
