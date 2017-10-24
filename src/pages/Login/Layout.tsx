const QR = require('react-qr')

import * as React from 'react'
import { Link } from 'react-router'
import { Action } from 'redux'

import { Configuration } from '../../configuration'
import { Images } from '../../images/Images'

import '../../extensions/String'
import './Layout.scss'

export interface LoginLayoutProps {
  readonly requestId: string;
}

export interface LoginLayoutState {

}

interface LoginActions {
  mockLoginRequest: (id: string) => Action;
  loginButtonClickedAction: () => Action;
}

export class LoginLayout extends React.Component<LoginLayoutProps & LoginActions, LoginLayoutState> {
  render() {
    return (
      <section className="page-login">
        <div className="top-row">
          <div><img src={Images.Logo} /></div>
          <h1>Login to Poet</h1>
        </div>
        <div className="middle-row">
          <section>
            <div className="qr">
              { this.props.requestId
                ? this.renderQR()
                : <img src={Images.Quill} className="loading" />
              }
            </div>
            <h2>Scan QR code to log in</h2>
            <div className="partner-login">
              <p>The Poet platform is currently under active development and accounts are available only to Alpha Media Partners.</p>
              <p><a href="mailto:contact@po.et" target="_blank">Become an Alpha Partner</a></p>
            </div>
          </section>
        </div>
        <div className="bottom-row"></div>

      </section>
    )
  }

  private renderQR() {
    return Configuration.useMockSigner
      ? (
          <a href="#" onClick={() => this.props.mockLoginRequest(this.props.requestId)}>
            <QR text={ (this.props.requestId && this.props.requestId.padEnd(50)) || ''} />
          </a>
      )
      : <QR text={ (this.props.requestId && this.props.requestId.padEnd(50)) || ''} />
  }

  componentDidMount() {
    this.props.loginButtonClickedAction();
  }

}
