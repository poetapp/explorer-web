import * as React from "react";
import { connect } from "react-redux";
import { Claim } from 'poet-js';

import { Images } from '../../images/Images';
import { PoetAppState } from '../../store/PoetAppState';
import { Actions } from "../../actions/index";
import { WorkDetails } from '../atoms/WorkDetails';
import Modal, {ModalProps} from "./Modal";

import "./Modal.scss";
import "./CreateWorkResult.scss";

interface RegisterWorkResultProps {
  readonly visible: boolean;
  readonly workClaim: Claim;
}

class CreateWorkResultComponent extends Modal<RegisterWorkResultProps & ModalProps, undefined> {
  draw() {
    if (!this.props.workClaim)
      throw new Error('CreateWorkResult Modal Error: no Work Claim!');

    return (
      <section className="modal-create-work-result">
        <main>
          <img src={Images.SuccessMark}/>
          <h1>Success!</h1>
          <h2>You have registered the following creative work</h2>
          <WorkDetails
            work={this.props.workClaim}
            className="claim-details"
            name timestamp
          />
        </main>
        <nav>
          <button className="button-primary" onClick={this.props.cancelAction} >Done</button>
        </nav>
      </section>
    );
  }
}

function mapStateToProps(state: PoetAppState): RegisterWorkResultProps {
  return {
    visible: state.modals.createWorkResult,
    workClaim: state.createWork.workClaim
  }
}

const mapDispatch = {
  cancelAction: () => ({ type: Actions.Modals.CreateWorkResult.Hide })
};

export const CreateWorkResult = connect(mapStateToProps, mapDispatch)(CreateWorkResultComponent);