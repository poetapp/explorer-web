import * as React from 'react'
import * as classNames from 'classnames'
import { Pricing as IPricing, PricingFrequency} from 'poet-js'

import { OptionGroup, Option } from '../../../components/molecules/OptionGroup';

import './Pricing.scss';

export interface PricingProps {
  readonly pricing: IPricing;
  readonly onChange: (pricing: IPricing) => void;
  readonly displayErrors?: boolean;
}

interface PricingState {
  readonly amountInputHasBeenBlurred: boolean;
}

export class Pricing extends React.Component<PricingProps, PricingState> {
  private valueInput: HTMLInputElement;

  constructor() {
    super(...arguments);
    this.state = {
      amountInputHasBeenBlurred: false
    }
  }

  render() {
    return (
      <section className="pricing">
        <h2>Pricing</h2>
        <div className="row">
          <div className="col-sm-4 label"><label>Frequency</label></div>
          <div className="col-sm-8">
            <OptionGroup
              className="panel-option-group"
              selectedId={this.props.pricing.frequency}
              onOptionSelected={this.onFrequencyChange}
            >
              <Option id="oneTime">One Time</Option>
            </OptionGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 label"><label>Price</label></div>
          <div className="col-sm-8">
            <div className="input-group">
              <input
                type="number"
                min="0"
                step={.1}
                ref={valueInput => this.valueInput = valueInput}
                className={classNames('form-control', this.isValueInvalid() && 'invalid')}
                value={this.props.pricing.price.amount}
                onChange={this.onAmountChange}
                onBlur={this.onBlur}
                />
              <span className="input-group-addon">{ this.props.pricing.price.currency }</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  private onAmountChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange({
      ...this.props.pricing,
      price: {
        ...this.props.pricing.price,
        amount: parseFloat(event.currentTarget.value)
      },
    });
  };

  private onFrequencyChange = (frequency: PricingFrequency) => {
    this.props.onChange({
      ...this.props.pricing,
      frequency
    });
  };

  private onBlur = () => {
    this.setState({ amountInputHasBeenBlurred: true });
  };

  private isValueInvalid() {
    return (this.state.amountInputHasBeenBlurred || this.props.displayErrors) && (!this.props.pricing || !this.props.pricing.price || !this.props.pricing.price.amount);
  }

  public focus() {
    this.valueInput && this.valueInput.focus();
  }

}