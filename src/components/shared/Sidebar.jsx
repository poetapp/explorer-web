import classnames from 'classnames'
import React, { Children } from 'react'

import classNames from './Sidebar.scss'

export const Sidebar = ({ children, scrollable, width, maxWidth = '50%', flex = 6, ...props }) => {
  const [sidebar, ...main] = Children.toArray(children)

  return (
    <div className={classnames(classNames.sidebar, { [classNames.scrollable]: scrollable })}>
      <aside style={{ width, flex, maxWidth }}>{sidebar}</aside>
      <main>{main}</main>
    </div>
  )
}
