import * as React from 'react';
import { Api } from 'poet-js';

import { WorkById } from '../../../components/atoms/Work'

import './TechnicalTab.scss';

export class TechnicalTab extends WorkById {

  poetURL() {
    return Api.Works.url(this.props.workId)
  }

  renderElement(resource: Api.Works.Resource, headers: Headers) {
    if (!resource)
      return <div className="technical-tab">Could not load technical information.</div>

    if (!resource.claimInfo)
      return <div className="technical-tab">Technical information not available. This work may be pending confirmation.</div>

    return (
      <div className="technical-tab">
        <table>
          <tbody>
          {
            Object.entries(resource.claimInfo).filter(([key, value]) => key !== 'id').map(([key, value]) => (
              <tr key={key}>
                <td>{ key }</td><td>{ value }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }

}