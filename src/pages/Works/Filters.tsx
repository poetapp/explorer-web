import * as React from 'react';
import * as ReactDatePicker from 'react-datepicker';
import * as moment from 'moment';
import { LicenseTypes, LicenseType } from 'poet-js';

import { DatePickerInput } from '../../components/atoms/DatePickerInput';

import './Filters.scss';

export interface FilterComponentProps {
  readonly dateFrom: moment.Moment;
  readonly dateTo: moment.Moment;
  readonly sortBy: string;
  readonly licenseType: LicenseType;
  readonly onDateFromChanged: (moment: moment.Moment) => void;
  readonly onDateToChanged: (moment: moment.Moment) => void;
  readonly onSortChange: (sortBy: string) => void;
  readonly onLicenseTypeChange: (licenseType: LicenseType) => void;
}

export class FiltersComponent extends React.Component<FilterComponentProps, undefined> {

  render() {
    return (
      <header>
        <div className="container">
          { this.renderSortByDropdown() }
          { this.renderLicenseTypes()}
          { this.renderDateSelector()}
        </div>
      </header>
    );
  }

  private renderSortByDropdown() {
    return (
      <section className="sort" onChange={(event: any) => this.props.onSortChange(event.target.value)} value={this.props.sortBy}>
        <span>Sort by</span>
        <select>
          <option value="datePublished">Date Published</option>
          <option value="name">Name</option>
          <option value="contentLength">Content Length</option>
        </select>
      </section>
    );
  }

  private renderLicenseTypes() {
    return (
      <section className="license-types">
        <span>License</span>
        <select
          value={this.props.licenseType.id}
          onChange={(event: any) => this.props.onLicenseTypeChange(LicenseTypes.find(licenseType => licenseType.id === event.target.value)) }
        >
          { LicenseTypes.map((licenseType, index) => <option key={index} value={licenseType.id} >{licenseType.name}</option>)}
        </select>
      </section>
    );
  }

  private renderDateSelector() {
    return (
      <section className="date-picker">
        <strong>Created&nbsp;</strong>
        <span className="mr-1">between</span>
        <ReactDatePicker
          onChange={this.props.onDateFromChanged}
          selected={this.props.dateFrom}
          selectsStart
          startDate={this.props.dateFrom}
          endDate={this.props.dateTo}
          placeholderText="Select..."
          customInput={<DatePickerInput/>}
          isClearable />
        <span className="date-picker-separator">and</span>
        <ReactDatePicker
          onChange={this.props.onDateToChanged}
          selected={this.props.dateTo}
          selectsEnd
          placeholderText="Select..."
          startDate={this.props.dateFrom}
          endDate={this.props.dateTo}
          customInput={<DatePickerInput/>}
          isClearable />
      </section>
    );
  }


}