import * as React from 'react';
import * as classNames from 'classnames';
import { ClassNameProps } from 'poet-js';

import { OptionGroup, Option } from '../../components/molecules/OptionGroup';

import './PortfolioFilters.scss';

interface PortfolioWorksFiltersProps extends ClassNameProps {
  readonly selectedId: string;
  readonly onOptionSelected: (id: string) => void;
}

export class PortfolioWorksFilters extends React.Component<PortfolioWorksFiltersProps, undefined> {
  public static readonly ALL = 'all';
  public static readonly LICENSED_TO_ME = 'licensedTo';
  public static readonly OWNED = 'owned';
  public static readonly AUTHORED = 'authored';

  render() {
    return (
      <OptionGroup
        selectedId={this.props.selectedId}
        onOptionSelected={this.props.onOptionSelected}
        className={classNames('panel-option-group', 'extended', this.props.className)}>
        <Option id={PortfolioWorksFilters.ALL}>All</Option>
        <Option id={PortfolioWorksFilters.LICENSED_TO_ME}>Licensed</Option>
        <Option id={PortfolioWorksFilters.OWNED}>Owned</Option>
        <Option id={PortfolioWorksFilters.AUTHORED}>Authored</Option>
      </OptionGroup>
    )
  }

}
