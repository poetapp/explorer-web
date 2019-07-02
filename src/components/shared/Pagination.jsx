import classnames from 'classnames'
import React from 'react'

import { OfNumbers } from 'helpers/array'

import classNames from './Pagination.scss'

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  const cappedPageCount = Math.min(pageCount, 10)
  console.log('Pagination', cappedPageCount, pageCount)
  return (
    <section className={classNames.pagination}>
      { OfNumbers(cappedPageCount).map(i =>
        <button
          key={`key${i}`}
          onClick={() => onChange(i)}
          className={classnames({[classNames.selected]: value === i})}
        >
          {i}
        </button>
      ) }
    </section>
  )
}
