import classnames from 'classnames'
import React, { Children, useState } from 'react'

import classNames from './Tabs.scss'

export const Tabs = ({ children, initialTab = 0 }) => {
  const [tab, setTab] = useState(children[initialTab])

  const labels = Children.map(children, child => console.log('Children.map', child) || child.props.label)

  return (
    <section className={classNames.root}>
      <TabSelector
        tabs={children}
        tab={tab}
        setTab={setTab}
      />
      <TabContent tab={tab} />
    </section>
  )
}

export const Tab = ({ children, selected }) => {
  return (
    <section className={classnames(classNames.selected)}>
      { children }
    </section>
  )
}

const TabSelector = ({ tabs, setTab, tab }) => {
  const onClick = tab => () => {
    setTab(tab)
  }

  return (
    <section className={classNames.selector}>
      <div className={classNames.selectorRail} />
      {tabs.map(t => (
        <TabLabel
          active={t.props.label === tab.props.label}
          key={t.props.label}
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

const TabContent = ({ tab }) => (
  <section className={classNames.content}>
    {tab ? tab : <UknownTab />}
  </section>
)

const UnknownTab = () => (
  <span>This content could not be displayed</span>
)
