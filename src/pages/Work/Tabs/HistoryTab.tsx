import * as React from 'react';
import * as moment from 'moment';
import { Api } from 'poet-js';

import { Images } from '../../../images/Images';
import { Configuration } from '../../../configuration';
import { PoetAPIResourceProvider } from '../../../components/atoms/base/PoetApiResource';
import { SelectWorkById } from '../../../components/atoms/Arguments';
import { renderEventMessage } from '../../Account/Notifications/Model';

import './HistoryTab.scss';

export class HistoryTab extends PoetAPIResourceProvider<ReadonlyArray<Api.Events.Resource>, SelectWorkById, undefined> {

  poetURL() {
    return Api.Events.url({
      work: this.props.workId
    })
  }

  renderElement(resource: ReadonlyArray<Api.Events.Resource>, headers: Headers) {
    return (
    <div className="history-tab">
      <ul>
        { resource.map(this.renderItem) }
      </ul>
    </div>
    )
  }

  private renderItem = (event: Api.Events.Resource) => {
    const text = renderEventMessage(event);
    return text && (
      <li key={event.id}>
        <div className="icon">
          <img src={Images.SuccessMarkGreen} />
        </div>
        <div className="message">{ text }</div>
        <div className="time">{ moment(event.timestamp).format(Configuration.dateTimeFormat) }<br/>({ moment(event.timestamp).fromNow() })</div>
      </li>
    );
  }

}
