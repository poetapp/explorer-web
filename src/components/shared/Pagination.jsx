import classnames from 'classnames'
import React from 'react'

import classNames from './Pagination.scss'

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  const cappedPageCount = Math.min(pageCount, 10)
  console.log('Pagination', cappedPageCount, pageCount)
  return (
    <section className={classNames.pagination}>
      { Array(cappedPageCount).fill(undefined).map((e, i) => i).map(i =>
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
