import * as React from 'react'

import { configureFeature } from '@paralleldrive/react-feature-toggles'
import { connect } from 'react-redux'
import { Tabs } from 'react-tabs'

import '../extensions/String'

import { Footer } from './organisms/Footer'
import { Navbar } from './organisms/Navbar'

import 'react-datepicker/dist/react-datepicker.css'

import './Root.scss'

Tabs.setUseDefaultStyles(false)

interface RootLayoutProps {
  readonly location?: {
    readonly pathname: string
  }
  readonly children?: React.ReactNode
}

function render(props: RootLayoutProps) {
  // TODO: templates rather than this url-matching monstrosity
  const location = props.location.pathname.trimLeftByPattern('/')

  const worksUrl = 'works'

  const navbarShadow = ![worksUrl, ''].includes(location)
  const navbarTransparent = [''].includes(location)
  const displayNavbarLogo = ![''].includes(location)
  const displayNavbarSearch = false && ![''].includes(location)
  const searchShadow = [worksUrl].includes(location)
  const Main = () => (
    <Navbar
      shadow={navbarShadow}
      displayLogo={displayNavbarLogo}
      displaySearch={displayNavbarSearch}
      transparent={navbarTransparent}
      searchShadow={searchShadow}
    />
  )
  const Test = () => <div>REACT-FEATURE-TOGGLE-TEST</div>
  const TestFeature = configureFeature(Main, 'foo', Test)
  return (
    <div className="root-layout">
      <TestFeature />
      {props.children}
      <Footer />
    </div>
  )
}

function mapStateToProps(state: any): RootLayoutProps {
  return {}
}

export const Layout = connect(mapStateToProps)(render)
