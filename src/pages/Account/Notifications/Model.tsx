import * as React from 'react';

import { Api } from 'poet-js';
import { WorkNameWithLinkById } from '../../../components/atoms/Work';
import { ProfileNameWithLink } from '../../../components/atoms/Profile';
import EventType = Api.Events.EventType

export const renderEventMessage = (event: Api.Events.Resource) => {
  switch (event.type) {
    case EventType.WORK_CREATED:
      return <span>Creative work registered by <ProfileNameWithLink profileId={event.actorId} >{event.actorDisplayName}</ProfileNameWithLink></span>;
    case EventType.PROFILE_CREATED:
      return <span><ProfileNameWithLink profileId={event.actorId} >{event.actorDisplayName}</ProfileNameWithLink> created a public profile</span>;
    case EventType.TITLE_ASSIGNED:
      return <span>Title for <WorkNameWithLinkById workId={event.workId} >{event.workDisplayName}</WorkNameWithLinkById> assigned to <ProfileNameWithLink profileId={event.actorId} >{event.actorDisplayName}</ProfileNameWithLink></span>;
    case EventType.LICENSE_OFFERED:
      return <span>License offered for <WorkNameWithLinkById workId={event.workId} >{event.workDisplayName}</WorkNameWithLinkById> by <ProfileNameWithLink profileId={event.actorId} >{event.actorDisplayName}</ProfileNameWithLink></span>;
    case EventType.LICENSE_BOUGHT:
      return <span>License bought for <WorkNameWithLinkById workId={event.workId} >{event.workDisplayName}</WorkNameWithLinkById> by <ProfileNameWithLink profileId={event.actorId} >{event.actorDisplayName}</ProfileNameWithLink></span>;
    case EventType.WORK_MODIFIED:
      return <span>Work <WorkNameWithLinkById workId={event.workId} /> modified by <ProfileNameWithLink profileId={event.actorId} /></span>;
    default:
      return null
  }
};
