import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'react-tabs';
import * as classNames from 'classnames'

import '../extensions/String';
import Constants from '../constants';
import { Alpha } from './molecules/Alpha'
import { Navbar } from "./organisms/Navbar";
import { Footer } from './organisms/Footer';
import { Modals } from './modals';

import 'react-datepicker/dist/react-datepicker.css';

import './Root.scss'

Tabs.setUseDefaultStyles(false);

const modals = Modals.map((Modal, index) => <Modal key={index}/>);

interface RootLayoutProps {
  readonly loggedIn?: boolean;
  readonly location?: {
    readonly pathname: string;
  }
  readonly children?: any;
}

function render(props: RootLayoutProps) {
  // TODO: a way for pages to provide these so the RootLayout doesn't need to know what urls are mapped to what pages
  const location = props.location.pathname.trimLeft('/');

  const worksUrl = 'works';
  const loginUrl = 'login';
  const marketingLandingUrl = 'marketing-landing';
  const isLoggedIn = props.loggedIn || !location;

  const navbarShadow = ![worksUrl, ''].includes(location);
  const navbarTransparent = ([''].includes(location)) && isLoggedIn;
  const navbarMargin = ![worksUrl].includes(location);
  const displayNavbarLogo = ![''].includes(location) || !isLoggedIn;
  const displayNavbarSearch = ![''].includes(location) || !isLoggedIn;
  const searchShadow = [worksUrl].includes(location);
  const displayNavbar = ![loginUrl, marketingLandingUrl].includes(location);
  const displayAlpha = location !== '' && location !== 'login';

  return (
    <div className="root-layout">
      { modals }
      { displayNavbar && <Navbar
        shadow={navbarShadow}
        displayLogo={displayNavbarLogo}
        displaySearch={displayNavbarSearch}
        transparent={navbarTransparent}
        searchShadow={searchShadow}
      /> }
      { displayAlpha && <section className={classNames('alpha', navbarMargin && 'margin')}>
        <div className="container">
          <Alpha />
        </div>
      </section> }
      { props.children }
      { location !== loginUrl && <Footer/> }
    </div>
  );
}

function mapStateToProps(state: any): RootLayoutProps {
  return {
    loggedIn: state.session.state === Constants.LOGGED_IN
  }
}

export const Layout = connect(mapStateToProps)(render);