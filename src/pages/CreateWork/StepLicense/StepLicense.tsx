import * as React from 'react'

import { Pricing as IPricing, LicenseType } from 'poet-js'

import { Pricing } from './Pricing';
import { LicensePreview } from './LicensePreview';
import { LicenseTypeComponent } from './LicenseType';

import './StepLicense.scss'

export interface StepLicenseData {
  readonly licenseType: LicenseType;
  readonly pricing: IPricing;
}

export interface StepLicenseProps extends StepLicenseData {
  readonly onSubmit: () => void;
  readonly onSkip: () => void;
  readonly onLicenseTypeChange: (_: LicenseType) => void;
  readonly onPricingChange: (_: IPricing) => void;
}

export interface StepLicenseState {
  readonly displayErrors?: boolean;
}

export class StepLicense extends React.Component<StepLicenseProps, StepLicenseState> {
  private pricingInput: Pricing;

  constructor() {
    super(...arguments)
    this.state = {
      displayErrors: false
    }
  }

  render() {
    return (
      <section className="step-2-license">
        <div className="row">
          <div className="col-sm-6">
            <h2>License</h2>
            <LicenseTypeComponent
              onSelectionChange={this.props.onLicenseTypeChange}
              selectedLicenseTypeId={this.props.licenseType.id} />
            <Pricing
              pricing={this.props.pricing}
              onChange={this.props.onPricingChange}
              displayErrors={this.state.displayErrors}
              ref={pricingInput => this.pricingInput = pricingInput}
            />
            <nav>
              <button className="button-secondary" onClick={this.props.onSkip}>skip</button>
              <button className="button-primary" onClick={this.submit}>Next</button>
            </nav>
          </div>
          <LicensePreview licenseType={this.props.licenseType} className="col-sm-6"/>
        </div>
      </section>
    )
  }

  private submit: () => void = () => {
    if (!this.props.pricing || !this.props.pricing.price || !this.props.pricing.price.amount || this.props.pricing.price.amount < 0) {
      this.setState({ displayErrors: true });
      this.pricingInput && this.pricingInput.focus();
      return;
    }

    this.props.onSubmit();
  };

}