import * as React from 'react'
const Overlays = require('react-overlays');

export interface ModalVisible {
  visible?: boolean
}

export interface ModalAction {
  cancelAction?: () => any
}

export interface ModalProps extends ModalVisible, ModalAction {}

abstract class Modal<T extends ModalProps, Q> extends React.Component<T, Q> {
  render() {
    if (!this.props.visible) {
      return <div/>
    }
    return (
      <Overlays.Modal
        aria-labelledby='modal-label'
        backdropClassName="backdrop"
        show={this.props.visible}
        onHide={this.onHide.bind(this)}
        className="modals-container"
      >
        { this.draw() }
      </Overlays.Modal>
    )
  }

  abstract draw(): any;

  private onHide() {
    if (this.beforeHide())
      this.props.cancelAction();
  }

  beforeHide(): boolean {
    return true;
  }
}

export default Modal;
