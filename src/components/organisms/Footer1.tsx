import * as React from 'react'

import { Images } from 'images/Images'

import './Footer1.scss'

export class Footer1 extends React.Component<undefined, undefined> {
  render() {
    return (
      <footer className="footer1">
        <div className="footer1__left-links">
          <a href="#">{new Date().getFullYear()} Po.et</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer1__social">
          <img src={Images.Quill} />
        </div>
        <div className="footer1__right-links">
          <a href="#">Frost API</a>
          <a href="#">Blog</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    )
  }
}
