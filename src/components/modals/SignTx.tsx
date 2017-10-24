const Overlays = require('react-overlays')
const QR = require('react-qr')

import * as React from 'react'
import { connect } from 'react-redux'

import { Configuration } from '../../configuration'
import { Images } from '../../images/Images';
import { PoetAppState, SignTransactionStore } from '../../store/PoetAppState'
import { Actions } from '../../actions/index'
import { ModalAction, ModalVisible } from './Modal'

import './Modal.scss'
import './SignTx.scss'

interface SignProps extends SignTransactionStore, ModalVisible {}

interface SignActions extends ModalAction {
  mockSign: (id: string) => any
}

function mapStateToProps(state: PoetAppState): SignProps {
  return Object.assign({},
    state.signTx,
    { visible: state.modals.signTx }
  )
}

const mapDispatch: {} & SignActions = {
  cancelAction: () => ({ type: Actions.Modals.SignTransaction.Hide }),
  mockSign: (id: string) => ({ type: Actions.Transactions.FakeSign, payload: id })
};

export const SignTransaction = (connect as any)(mapStateToProps, mapDispatch)(
  class extends React.Component<SignProps & SignActions, undefined> {

    render() {
      if (!this.props.visible)
        return null;

      return (
        <Overlays.Modal
          className="modals-container"
          backdropClassName="backdrop"
          show={this.props.visible}
          onHide={this.onHide}
        >
          <section className="modal-sign-transaction">
            <header>
              <h1>Scan the code from your <br/>
                Poet: Authenticator App to <br/>
                complete the purchase</h1>
              <a href="">Download App</a>
            </header>
            <main>
              <div className="qr">
                { this.props.submitting || !this.props.requestId
                  ? <img src={Images.Quill} className="loading-quill" />
                  : this.renderQR()
                }
              </div>
              <h2>This will authorize the following transaction</h2>

              <ul>
                <li>License Purchase</li>
              </ul>

            </main>
            <nav>
              <button onClick={this.props.cancelAction}>Cancel</button>
            </nav>
          </section>
        </Overlays.Modal>
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

    private onHide = () => {
      if (!this.props.submitting)
        this.props.cancelAction();
    }

  }
);