import * as React from 'react'
import * as classNames from 'classnames'
import { ClassNameProps } from 'poet-js'

enum StepState {
  NotDone, Selected, Done
}

interface StepProps {
  readonly stepNumber: number;
  readonly stepName: string;
  readonly state: StepState;
  readonly onClick?: () => void;
}

class Step extends React.Component<StepProps, undefined> {
  render() {
    const stateClassName = {
      'not-done': this.props.state === StepState.NotDone,
      'selected': this.props.state === StepState.Selected,
      'done': this.props.state === StepState.Done
    };
    return (
      <div className={classNames('step', stateClassName)}>
        <div className="number">{ this.props.stepNumber }</div>
        <div className="name" onClick={this.props.onClick}>{ this.props.stepName }</div>
      </div>
    )
  }
}

interface CurrentStepProps extends ClassNameProps {
  readonly selectedStep: number;
  readonly onClick?: (index: number) => void;
}

export class CurrentStep extends React.Component<CurrentStepProps, undefined> {
  private readonly steps: ReadonlyArray<string> = ['Register', 'License', 'Review'];

  render() {
    return (
      <section className={this.props.className}>
        { this.steps.map((step, index) =>
          [<Step
            stepNumber={index + 1}
            stepName={step}
            state={this.stepState(index)}
            onClick={ () => this.props.onClick && this.props.onClick(index)}
          />, index < this.steps.length - 1 && <hr/>]) }

      </section>
    )
  }

  private stepState(index: number): StepState {
    return this.props.selectedStep > index ? StepState.Done : this.props.selectedStep === index ? StepState.Selected : StepState.NotDone;
  }
}