import * as React from 'react';
import * as moment from 'moment';
import { License } from 'poet-js';

import { Configuration } from '../../configuration';
import { WorkNameById, WorkNameWithLinkById } from './Work';


export function TimeSinceIssueDate(props: { license: License }) {
  const issueDate = props.license
    && props.license.attributes
    && props.license.attributes.issueDate
  return (<span>{
    issueDate
      ? moment(issueDate).format(Configuration.dateFormat)
      : '(unknown publication date)'
  }</span>)
}

export function ReferencedWorkName(props: { license: License }) {
  return <WorkNameById workId={props.license.attributes.reference} />
}

export function ReferencedWorkNameWithLink(props: { license: License }) {
  return <WorkNameWithLinkById workId={props.license.attributes.reference} />
}
