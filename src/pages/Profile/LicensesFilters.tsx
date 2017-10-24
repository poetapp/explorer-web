import * as React from 'react';
import * as classNames from 'classnames';
import { ClassNameProps } from 'poet-js';

import { OptionGroup, Option } from '../../components/molecules/OptionGroup';

import './LicensesFilters.scss';

interface LicensesFiltersProps extends ClassNameProps {
  readonly selectedId: string;
  readonly onOptionSelected: (id: string) => void;
}

export class LicensesFilters extends React.Component<LicensesFiltersProps, undefined> {
  public static readonly ALL = 'all';
  public static readonly SOLD = 'sold';
  public static readonly PURCHASED = 'purchased';

  render() {
    return (
      <OptionGroup
        selectedId={this.props.selectedId}
        onOptionSelected={this.props.onOptionSelected}
        className={classNames('panel-option-group', 'extended', this.props.className)}>
        <Option id={LicensesFilters.ALL}>All</Option>
        <Option id={LicensesFilters.SOLD}>Sold</Option>
        <Option id={LicensesFilters.PURCHASED}>Purchased</Option>
      </OptionGroup>
    )
  }

}
