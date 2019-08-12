import classnames from 'classnames'
import React, { useState } from 'react'

import classNames from './Tabs.scss'

export const Tabs = ({ children, initialTab = 0, ...props }) => {
  const [tab, setTab] = useState(children[initialTab])

  return (
    <section className={classNames.root}>
      <TabSelector
        setTab={setTab}
        tab={tab}
        tabs={children}
      />
      <TabContent tab={tab} />
    </section>
  )
}

const TabSelector = ({ setTab, tab, tabs, ...props }) => {
  const onClick = tab => () => {
    setTab(tab)
  }

  return (
    <section className={classNames.selector}>
      <div className={classNames.selectorRail} />
      {tabs.map(t => (
        <TabLabel
          active={t.props.label === tab.props.label}
          label={t.props.label}
          onClick={onClick}
          tab={t}
        />
      ))}
      <div className={classNames.selectorRail} />
    </section>
  )
}

const TabLabel = ({ active, label, onClick, tab }) => (
  <div
    className={classnames(classNames.label, { [classNames.labelActive]: active })}
    onClick={onClick(tab)}
  >
    {label}
  </div>
)

const TabContent = ({ tab, ...props }) => (
  <section className={classNames.content}>
    {tab ? tab : <UknownTab />}
  </section>
)

const UnknownTab = () => (
  <span>This content could not be displayed</span>
)
