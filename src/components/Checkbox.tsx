import * as React from 'react';

export interface ChckboxProps {
  text: string;
  onChange: (newState: boolean) => any;
}

export class Checkbox extends React.Component<ChckboxProps, undefined> {
  change: (ev: any) => void

  constructor() {
    super(...arguments);

    this.change = (ev) => {
      this.props.onChange(ev.target.checked)
    }
  }
  render() {
    return (
      <label className="custom-control custom-checkbox">
        <input onChange={this.change} type="checkbox" className="custom-control-input" />
        <span className="custom-control-indicator" />
        <span className="custom-control-description">{this.props.text}</span>
      </label>
    );
  }
}