import classnames from 'classnames'
import React from 'react'

import { ofNumbers } from 'helpers/array'

import classNames from './Pagination.scss'

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  const cappedPageCount = Math.min(pageCount, 10)
  const cappedValue = Math.max(value - 5, 0)

  return (
    <section className={classNames.pagination}>
      { ofNumbers(cappedPageCount, cappedValue).map(i =>
        <button
          key={`key${i}`}
          onClick={() => onChange(i)}
          className={classnames({[classNames.selected]: value === i})}
        >
          {i + 1}
        </button>
      ) }
    </section>
  )
}
