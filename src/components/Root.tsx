import { configureFeature } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { Tabs } from 'react-tabs'

import { Footer } from 'components/organisms/Footer'
import { Navbar } from 'components/organisms/Navbar'
import 'extensions/String'

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
  const displayNavButtons = [''].includes(location)

  const Main = () => (
    <Navbar
      shadow={navbarShadow}
      displayLogo={displayNavbarLogo}
      displaySearch={displayNavbarSearch}
      transparent={navbarTransparent}
      searchShadow={searchShadow}
      displayNavButtons={displayNavButtons}
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
