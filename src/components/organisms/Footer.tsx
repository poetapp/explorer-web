import * as React from 'react'

import { Images } from '../../images/Images'

import './Footer.scss'

export class Footer extends React.Component<undefined, undefined> {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="logo-and-social">
            <img src={Images.InvertedLogo} />
            <div className="social">
              <a href="https://twitter.com/_poetproject" target="_blank">
                <img src={Images.Twitter} />
              </a>
              <a href="https://github.com/poetapp" target="_blank">
                <img src={Images.Github} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
