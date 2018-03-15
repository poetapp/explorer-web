import * as React from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'react-tabs'

import '../extensions/String'

import { Navbar } from './organisms/Navbar'
import { Footer } from './organisms/Footer'

import 'react-datepicker/dist/react-datepicker.css'

import './Root.scss'

Tabs.setUseDefaultStyles(false);

interface RootLayoutProps {
  readonly location?: {
    readonly pathname: string;
  }
  readonly children?: any;
}

function render(props: RootLayoutProps) {
  // TODO: templates rather than this url-matching monstrosity
  const location = props.location.pathname.trimLeft('/')

  const worksUrl = 'works'

  const navbarShadow = ![worksUrl, ''].includes(location)
  const navbarTransparent = ([''].includes(location))
  const displayNavbarLogo = ![''].includes(location)
  const displayNavbarSearch = false && ![''].includes(location)
  const searchShadow = [worksUrl].includes(location)

  return (
    <div className="root-layout">
      <Navbar
        shadow={navbarShadow}
        displayLogo={displayNavbarLogo}
        displaySearch={displayNavbarSearch}
        transparent={navbarTransparent}
        searchShadow={searchShadow}
      />
      { props.children }
      <Footer/>
    </div>
  )
}

function mapStateToProps(state: any): RootLayoutProps {
  return {}
}

export const Layout = connect(mapStateToProps)(render);