import * as React from 'react';
import * as ReactDatePicker from 'react-datepicker';
import * as moment from 'moment';

import { DatePickerInput } from '../../../components/atoms/DatePickerInput';
import { ProfileAutocomplete } from '../../../components/atoms/ProfileAutocomplete';
import { AttributeName } from './AttributeName';

import './Attribute.scss';

export interface AttributeData {
  readonly keyName: string;
  value: string;
  readonly optional?: boolean;
  readonly keyNameReadOnly?: boolean;
}

export interface AttributeProps {
  readonly onKeyChange: (key: string) => void;
  readonly onValueChange: (value: string) => void;
  readonly onRemove: () => void;
  readonly displayErrors: boolean;
}

interface AttributeState {
  readonly valueInputHasBeenBlurred: boolean;
}

export class Attribute extends React.Component<AttributeProps & AttributeData, AttributeState> {
  private attributeName: AttributeName;

  constructor() {
    super(...arguments);
    this.state = {
      valueInputHasBeenBlurred: false
    };
  }

  render() {
    return (
      <div className="row attribute">
        <div className="col-sm-4">
          <AttributeName
            onChange={this.props.onKeyChange}
            attributeName={this.props.keyName}
            ref={attributeName => this.attributeName = attributeName}
            readOnly={this.props.keyNameReadOnly}
          />
        </div>
        <div className="col-sm-7">
          { this.isDate(this.props.keyName) ? this.renderValueDate() : this.isAuthor(this.props.keyName) ? this.renderValueAuthor() : this.renderValueText() }
        </div>
        <div className="col-sm-1">
          { this.props.optional && <button
            onClick={this.onRemove.bind(this)}
            className="remove button-secondary">—</button> }
        </div>
      </div>
    )
  }

  private onRemove(event: Event) {
    event.preventDefault();
    this.props.onRemove();
  }

  private isDate(keyName: string) {
    return ['dateCreated', 'datePublished'].includes(keyName);
  }

  private isAuthor(keyName: string) {
    return keyName === 'author';
  }

  private renderValueText() {
    return <input
      className={this.isValueInvalid() && 'invalid'}
      onChange={(event: any) => this.props.onValueChange(event.target.value)}
      onBlur={this.onBlur}
      type="text"
      placeholder="Attribute Value"
      value={this.props.value} />;
  }

  private renderValueDate() {
    const value = moment(parseInt(this.props.value));
    return <ReactDatePicker
      className={this.isValueInvalid() && 'invalid'}
      onChange={(moment: moment.Moment) => this.props.onValueChange(moment.toDate().getTime().toString())}
      onBlur={this.onBlur}
      selected={value.isValid() ? value : null}
      dateFormat="dddd, MMMM Do YYYY"
      customInput={<DatePickerInput />} />;
  }

  private renderValueAuthor() {
    return <ProfileAutocomplete
      className={this.isValueInvalid() && 'invalid'}
      onSelect={this.props.onValueChange}
      onChange={this.props.onValueChange}
      value={this.props.value}
      placeholder="Attribute Name" />
  }

  private onBlur = () => {
    this.setState({ valueInputHasBeenBlurred: true });
  };

  private isValueInvalid() {
    return (this.state.valueInputHasBeenBlurred || this.props.displayErrors ) && !this.props.optional && !this.props.value;
  }

  public focus() {
    this.attributeName.focus();
  }
}