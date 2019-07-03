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
      { value > 5 && <Button i={0} onClick={onChange} /> }
      { ofNumbers(cappedPageCount, cappedValue).map(i =>
        <Button
          i={i}
          key={`key${i}`}
          onClick={onChange}
          isSelected={value === i}
        />
      ) }
      { value <= pageCount - 5 && <Button i={pageCount} onClick={onChange} /> }
    </section>
  )
}

const Button = ({ i, onClick, isSelected = false }) => (
  <button
    onClick={() => onClick(i)}
    className={classnames({[classNames.selected]: isSelected})}
  >
    {i + 1}
  </button>
)
