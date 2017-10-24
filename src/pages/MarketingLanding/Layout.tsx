import * as React from 'react';

import { Images } from '../../images/Images';

import './Layout.scss';

export function Layout() {
  return (
    <section className="page-marketing" style={{backgroundImage: `url("${Images.RadialPattern}")`}}>
      <section className="introduction container">
        <img src={Images.Logo} />
        <h1>Poet is a platform for managing<br/>
          timestamped intellectual property</h1>
        <h2>Built on the Bitcoin blockchain, the most globally-verifiable<br/>
          record the world has ever seen.</h2>
        <button className="button-secondary">Contact Us</button>
      </section>
      <section className="quote container">
        <h1>Why do we need Proof of Existence?</h1>
        <blockquote>“The blockchain nails down history, breaking Orwell’s
          dictum of ‘He who controls the present controls the past
          and he who controls the past controls the future.’”<br/><br/>- Julian Assange</blockquote>
      </section>
      <section className="features container">
        <h1>Features</h1>
        <ol>
          <li>
            <div className="wrapper">
              <h2>Immutable Attribution</h2>
              <main>A Poet timestamp is unalterable, providing
                proof that something was established at a
                precise point in history. It enables a searchable
                database of creative works that illustrates
                verifiable claims in history</main>
            </div>
            <Placeholder />
          </li>
          <li>
            <div className="wrapper">
              <h2>License Your Works</h2>
              <main>The value of digital works will be reclaimed
                with a method for licensing and payment for
                publishing. Users can put work up for sale or
                pay others to utilize their content.</main>
            </div>
            <Placeholder />
          </li>
          <li>
            <div className="wrapper">
              <h2>100% Ownership</h2>
              <main>Ownership can be granted to an individual
                or part of a group. Split up the royalties from
                a creative project and enjoy the full benefits
                of your hard work, no middleman required.</main>
            </div>
            <Placeholder />
          </li>
        </ol>
      </section>
      <section className="use-cases">
        <div className="wrapper">
          <div className="container">
            <h1>Use Cases</h1>
            <section className="user-types">
              <section className="content-creators">
                <div className="info">
                  <img src={Images.Avatar} />
                  <div className="wrapper">
                    <h2>Content Creators</h2>
                    <main>As a content creator on the internet, you
                      can use the Poet platform to get the most
                      out of your creative portfolio.</main>
                  </div>
                </div>
                <ol>
                  <li>Metadata and attribution are lost online. You can now
                    provide the official record of when, where and by whom
                    a work was created.</li>
                  <li>First to a big idea? Now you can prove it and
                    monetize your ingenuity with Poet.</li>
                  <li>Update your creative work as it evolves. A verifiable
                    history will demonstrate when changes were made.</li>
                </ol>

              </section>
              <section className="publishers">
                <div className="info">
                  <img src={Images.Avatar} />
                  <div className="wrapper">
                    <h2>Content Creators</h2>
                    <main>As a content creator on the internet, you
                      can use the Poet platform to get the most
                      out of your creative portfolio.</main>
                  </div>
                </div>
                <ol>
                  <li>Metadata and attribution are lost online. You can now
                    provide the official record of when, where and by whom
                    a work was created.</li>
                  <li>First to a big idea? Now you can prove it and
                    monetize your ingenuity with Poet.</li>
                  <li>Update your creative work as it evolves. A verifiable
                    history will demonstrate when changes were made.</li>
                </ol>

              </section>
            </section>
            <section className="partners">
              <header>
                <h2>Alpha Partners</h2>
              </header>
              <main>
                <ul>
                  <li><img src={Images.BtcMagazineLogo} /></li>
                  <li><img src={Images.ScoutLogo} /></li>
                  <li><img src={Images.LonelyPlanetLogo} /></li>
                  <li><img src={Images.ChainbLogo} /></li>
                </ul>
                <button className="button-secondary">Become an Alpha Partner</button>
              </main>
            </section>
          </div>
        </div>
      </section>
      <section className="team container">
        <h1>Team</h1>
        <ul>
          {[1, 2, 3].map(() =>
            <li>
              <div className="circle"></div>
              <h2>Satoshi Nakamoto</h2>
              <small>As a content creator on the internet, you can use the po.et platform to get the most out of your creative portfolio</small>
            </li>
          )}
        </ul>
        <section className="become-alpha-partner">
          <h2>Become an Alpha Partner</h2>
          <main>We are currently looking for business to partner with and test drive the Poet Platform</main>
          <button className="button-secondary">Secondary Button</button>
        </section>
      </section>
    </section>
  );
}

function Placeholder() {
  return <div className="placeholder"></div>
}