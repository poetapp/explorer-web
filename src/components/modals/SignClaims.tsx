const QR = require('react-qr')

import * as React from "react"
import {connect} from "react-redux"
import { Claim, ClaimTypes } from 'poet-js'

import { Configuration } from '../../configuration'
import { Images } from '../../images/Images'
import { Actions } from "../../actions/index"
import { WorkDetails } from '../atoms/WorkDetails'
import Modal, {ModalProps} from "./Modal"

import "./Modal.scss"
import "./SignClaims.scss"

interface SignProps {
  readonly requestId: string;
  readonly visible: boolean;
  readonly submitting: boolean;
  readonly success: boolean;
  readonly claims: ReadonlyArray<Claim>;
}

interface SignActions {
  readonly mockSign: (id: string) => any
}

function mapStateToProps(state: any): SignProps {
  return {
    visible: state.modals.signWork,
    requestId: state.claimSign.id,
    success: state.claimSign.success,
    submitting: state.claimSign.submitting,
    claims: state.claimSign.claims || []
  }
}

const mapDispatch = {
  cancelAction: () => ({ type: Actions.Modals.SignClaims.Hide }),
  mockSign: (id: string) => ({ type: Actions.Claims.FakeSign, payload: id })
};

export const SignWork = connect(mapStateToProps, mapDispatch)(
  class extends Modal<SignProps & SignActions & ModalProps, undefined> {

    draw() {
      if (this.props.submitting)
        return this.renderLoading();

      return this.renderSignRequest();
    }

    private renderLoading() {
      return (
        <section className="modal-sign-work loading">
          <img src={Images.Quill} />
        </section>
      )
    }

    private renderSignRequest() {
      const workClaim = this.props.claims.find(claim => claim.type === ClaimTypes.WORK);
      const profileClaim = this.props.claims.find(claim => claim.type === ClaimTypes.PROFILE);

      return (
        <section className="modal-sign-work">
          <header>
            <h1>Scan the code from your <br/>
              Poet: Authenticator App to <br/>
              complete the registration</h1>
            <a href="">Download App</a>
          </header>
          <main>
            <div className="qr">
              { this.props.submitting || !this.props.requestId
                ? <img src={Images.Quill} className="loading" />
                : this.renderQR()
              }
            </div>
            <h2>This will authorize the following transaction</h2>

            { workClaim && <WorkDetails
              work={workClaim}
              className="claim-details"
              name timestamp
            /> }

            { profileClaim && <ul className="claim-details">
              <li>Profile Update</li>
            </ul> }

          </main>
          <nav>
            <button onClick={this.props.cancelAction}>Cancel</button>
          </nav>
        </section>
      )
    }

    private renderQR() {
      return Configuration.useMockSigner
        ? (
          <a href="#" onClick={() => this.props.mockSign(this.props.requestId)}>
            <QR text={this.props.requestId || ''} />
          </a>
        )
        : <QR text={this.props.requestId || ''} />
    }

    beforeHide() {
      return !this.props.submitting;
    }

});