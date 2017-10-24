import * as React from "react"
import { Action } from 'redux'
import { connect } from "react-redux"
const QR = require('react-qr')
const Overlays = require('react-overlays')

import { Configuration } from '../../configuration'
import { Images } from '../../images/Images'
import { Actions } from "../../actions/index"
import { PoetAppState, TransferModalStore, TransferStore } from '../../store/PoetAppState'
import { ProfileBio, ProfileNameWithLink, ProfilePictureById } from '../atoms/Profile'
import { WorkAuthorById, WorkContentById, WorkNameWithLinkById } from '../atoms/Work'
import { ProfileAutocomplete } from '../atoms/ProfileAutocomplete'
import { ModalAction } from "./Modal"
import "./Transfer.scss";

interface TransferProps extends TransferStore, TransferModalStore {}

interface TransferActions {
  mockSign: (id: string) => any
  setTransferTarget: (id: string) => Action
}

interface TransferState {
  readonly value?: string
  readonly selected?: any
}

function mapStateToProps(state: PoetAppState): TransferProps {
  return {
    ...state.modals.transfer,
    ...state.transfer,
  }
}

const mapDispatch = {
  cancelAction: () => ({ type: Actions.Modals.Transfer.DismissRequested }),
  mockSign: (id: string) => ({ type: Actions.Transfer.FakeTransferSign, payload: id }),
  setTransferTarget: (id: string) => ({ type: Actions.Transfer.SetTransferTarget, payload: id })
};

export const Transfer = connect(mapStateToProps, mapDispatch)(
  class extends React.Component<TransferProps & TransferActions & ModalAction, TransferState> {

    constructor() {
      super(...arguments);
      this.state = {
        selected: null,
        value: ''
      }
    }

    componentWillReceiveProps(props: TransferProps & TransferActions & ModalAction) {
      if (this.props.visible !== props.visible)
        this.setState({ selected: null, value: '' })
    }

    render() {
      return (
        <Overlays.Modal
          className="modals-container"
          backdropClassName="backdrop"
          show={this.props.visible}
          onHide={this.props.cancelAction}
        >
          {
            !this.props.targetPublicKey
              ? !this.state.selected
                ? this.renderProfileSelection()
                : this.renderProfileConfirmation()
              : !this.props.success
                ? this.renderScanRequest()
                : this.renderSuccess()
          }
        </Overlays.Modal>
      )
    }

    private renderProfileSelection() {
      return (
        <section className="modal-transfer profile-selection">
          <h1>Transfer Work</h1>
          <section className="work">
            <header>
              <WorkNameWithLinkById workId={this.props.workId} />&nbsp;by&nbsp;<WorkAuthorById workId={this.props.workId} />
            </header>
            <main>
              <WorkContentById workId={this.props.workId} />
            </main>
          </section>
          <section className="profile-select">
            <h2>Transfer this work to:</h2>
            <ProfileAutocomplete
              className={this.isValueInvalid() && 'invalid'}
              onChange={this.onChange}
              onSelect={this.onSelect}
              value={this.state.value}
              placeholder="Search profiles..."/>
          </section>
        </section>
      )
    }

    private renderProfileConfirmation() {
      return (
        <section className="modal-transfer profile-selection">
          <h1>Transfer Work</h1>
          <section className="work">
            <header>
              <WorkNameWithLinkById workId={this.props.workId} />&nbsp;by&nbsp;<WorkAuthorById workId={this.props.workId} />
            </header>
            <main>
              <WorkContentById workId={this.props.workId} />
            </main>
          </section>
          <h2>Transfer this work to:</h2>
          <section className="profile">
            <ProfilePictureById profileId={this.state.value} />
            <div>
              <ProfileNameWithLink profileId={this.state.value} className="profile-name" />
              <ProfileBio profileId={this.state.value} />
            </div>
          </section>
          <nav>
            <button className="button-secondary" onClick={this.onPickSomeoneElse}>Pick Someone Else</button>
            <button className="button-primary" onClick={this.onTransfer}>Transfer</button>
          </nav>
        </section>
      )
    }

    private renderScanRequest() {
      return (
        <section className="modal-transfer scan-request">
          <header>
            <h1>Scan the code from your <br/>
              Poet: Authenticator App to <br/>
              complete the registration</h1>
            <a href="">Download App</a>
          </header>
          <main>
            <div className="qr">
              { !this.props.requestId
                ? <img src={Images.Quill} className="quill-loading" />
                : this.renderQR()
              }
            </div>
            <h2>This will authorize the following transaction:</h2>
            <ul>
              <li>Transference of Work</li>
            </ul>
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
              <QR text={this.props.requestId || ''} onClick={()=>console.log('ho')} />
            </a>
          )
        : <QR text={this.props.requestId || ''} onClick={()=>console.log('ho')} />
    }

    private renderSuccess() {
      return (
        <section className="modal-transfer success">
          <main>
            <img src={Images.SuccessMark}/>
            <h1>Success!</h1>
            <h2>You have transfered the creative work</h2>
          </main>
          <nav>
            <button className="button-primary" onClick={this.props.cancelAction} >Done</button>
          </nav>
        </section>
      )
    }

    private onSelect = (value: string) => {
      this.setState({selected: value, value})
    }

    private onChange = (value: string) => {
      this.setState({value})
    }

    private onPickSomeoneElse = () => {
      this.setState({ selected: null, value: '' });
    }

    private onTransfer = () => {
      this.props.setTransferTarget(this.state.selected);
    }

    private isValueInvalid() {
      return false;
    }

  });