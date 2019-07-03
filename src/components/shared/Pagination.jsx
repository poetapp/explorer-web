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

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  if (!pageCount)
    return null

  const cappedPageCount = Math.min(pageCount, 10)
  const cappedValue = Math.min(Math.max(value - 5, 0), pageCount - 9)

  return (
    <section className={classNames.pagination}>
      { value > 5 && <Button page={0} onClick={onChange} /> }
      { ofNumbers(cappedPageCount, cappedValue).map(page =>
        <Button
          page={page}
          key={`key${page}`}
          onClick={onChange}
          isSelected={value === page}
        />
      ) }
      { value <= pageCount - 5 && <Button page={pageCount} onClick={onChange} /> }
    </section>
  )
}

const Button = ({ page, onClick, isSelected = false }) => (
  <button
    onClick={() => onClick(page)}
    className={classnames({[classNames.selected]: isSelected})}
  >
    {page + 1}
  </button>
)
