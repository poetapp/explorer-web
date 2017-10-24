import * as React from "react";
import * as moment from 'moment';
import { Claim, ClassNameProps } from 'poet-js';

interface WorkDetailsProps extends ClassNameProps {
  readonly work: Claim;
  readonly name?: boolean;
  readonly timestamp?: boolean;
}

export class WorkDetails extends React.Component<WorkDetailsProps, undefined> {
  render() {
    return (
      <ul className={this.props.className}>
        { this.props.name && <li>Name: {this.getAttributeValue('name')}</li> }
        { this.props.timestamp && <li>Timestamp: {moment(this.getAttributeValue('submitDate')).format('DD-MM-YY [at] HH:mm:ss')}</li> }
      </ul>
    )
  }

  private getAttributeValue(attributeName: string) {
    const attributes = this.props.work.attributes as any;
    const value = attributes.find((attribute: any) => attribute.key === attributeName);

    return value && value.value;
  }
}