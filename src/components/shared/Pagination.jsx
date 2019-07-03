import classnames from 'classnames'
import React from 'react'

import { ofNumbers } from 'helpers/array'

import classNames from './Pagination.scss'

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  const cappedPageCount = Math.min(pageCount, 10)
  const cappedValue = Math.max(value - 5, 0)

  return (
    <section className={classNames.pagination}>
      {
        value > 5 && <Button
          i={0}
          onClick={onChange}
          isSelected={value === 0}
        />
      }
      { ofNumbers(cappedPageCount, cappedValue).map(i =>
        <Button
          i={i}
          onClick={onChange}
          isSelected={value === i}
        />
      ) }
      {
        value < pageCount - 5 && <Button
          i={pageCount}
          onClick={onChange}
          isSelected={value === pageCount}
        />
      }
    </section>
  )
}

const Button = ({ i, onClick, isSelected }) => (
  <button
    key={`key${i}`}
    onClick={() => onClick(i)}
    className={classnames({[classNames.selected]: isSelected})}
  >
    {i + 1}
  </button>
)
