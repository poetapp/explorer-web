import classnames from 'classnames'
import React from 'react'

import classNames from './Pagination.scss'

export const Pagination = ({ pageCount = 10, value, onChange }) => {
  return (
    <section className={classNames.pagination}>
      { Array(pageCount).fill(undefined).map((e, i) => i).map(i =>
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
