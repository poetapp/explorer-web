import classnames from 'classnames'
import { identity } from 'ramda'
import React, { Children, useState } from 'react'

import classNames from './Tabs.scss'

export const Tabs = ({ children, initialTab }) => {
  const tabs = Children.map(children, child => child?.props?.label).filter(identity)
  const [selectedTab, setSelectedTab] = useState(initialTab || tabs[0])

  return (
    <section className={classNames.root}>
      <TabSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectionChange={setSelectedTab}
      />
      <TabContent>
        { Children.map(children, child => child?.props?.label === selectedTab && child) }
      </TabContent>
    </section>
  )
}

export const Tab = ({ children }) => (
  <section>
    { children }
  </section>
)

const TabSelector = ({ tabs, selectedTab, onSelectionChange }) => {
  const onTabClick = tab => () => onSelectionChange(tab)

  return (
    <section className={classNames.selector}>
      <div className={classNames.selectorRail} />
      {tabs.map(label => (
        <TabLabel
          key={label}
          active={label === selectedTab}
          label={label}
          onClick={onTabClick(label)}
        />
      ))}
      <div className={classNames.selectorRail} />
    </section>
  )
}

const TabLabel = ({ active, label, onClick }) => (
  <div
    className={classnames(classNames.label, { [classNames.labelActive]: active })}
    onClick={onClick}
  >
    { label }
  </div>
)

const TabContent = ({ children }) => (
  <section className={classNames.content}>
    { children }
  </section>
)
