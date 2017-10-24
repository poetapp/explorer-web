import * as React from 'react';

import { LicenseType, LicenseTypes } from 'poet-js';
import { OptionGroup, Option } from '../../../components/molecules/OptionGroup';

import './LicenseType.scss';

export interface LicenseTypeProps {
  readonly onSelectionChange?: (licenseType: LicenseType) => void;
  readonly selectedLicenseTypeId: string;
}

export class LicenseTypeComponent extends React.Component<LicenseTypeProps, undefined> {

  render() {
    return (
      <OptionGroup
        className="license-type panel-option-group"
        onOptionSelected={this.onLicenseTypeSelected.bind(this)}
        selectedId={this.props.selectedLicenseTypeId}
      >
        { LicenseTypes.map(licenseType => <Option key={licenseType.id} id={licenseType.id}>{licenseType.name}</Option>) }
      </OptionGroup>
    )
  }

  private onLicenseTypeSelected(licenseTypeId: string) {
    this.props.onSelectionChange(LicenseTypes.find(licenseType => licenseType.id === licenseTypeId));
  }

}