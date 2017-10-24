import * as React from 'react';
import { Link } from 'react-router';
import * as moment from 'moment';
import { Api, Work, Headers } from 'poet-js';

import { PoetAPIResourceProvider } from './base/PoetApiResource';
import { SelectWorkById } from './Arguments';
import { ProfileNameWithLink } from './Profile';

interface WorkProps {
  readonly work: Work;
}

abstract class ProfileByWorkOwner<State> extends PoetAPIResourceProvider<Api.Profiles.Resource, SelectWorkById, State> {
  poetURL() {
    return `/profiles/ownerOf/${this.props.workId}`
  }
}

export class OwnerName extends ProfileByWorkOwner<undefined> {
  renderElement(resource: Api.Profiles.Resource) {
    return <span>{resource.attributes && resource.attributes.displayName || 'Anonymous'}</span>
  }
}

export abstract class WorkById<State = undefined> extends PoetAPIResourceProvider<Api.Works.Resource, SelectWorkById, State> {
  poetURL() {
    return Api.Works.url(this.props.workId)
  }
}

export class WorkNameById extends WorkById {
  renderElement(resource: Api.Works.Resource) {
    const title = resource.attributes
      && resource.attributes.name
      || '(untitled)';
    return <span>{ title }</span>;
  }
}

export class WorkAuthorById extends WorkById {
  renderElement(work: Work) {
    return work && work.author ? (
      <ProfileNameWithLink profileId={work.author.id}>
        {work.author.displayName}
      </ProfileNameWithLink>
    ) : (
      <span>{work && work.attributes && work.attributes.author || 'Unknown Author'}</span>
    );
  }
}

export class WorkContentById extends WorkById {
  renderElement(work: Work) {
    return (
      <span>{work && work.attributes && work.attributes.content || 'Unknown Author'}</span>
    );
  }
}

export class WorkNameWithLinkById extends WorkById {

  renderElement(work: Api.Works.Resource) {
    return <WorkNameWithLink work={work} />
  }

  renderLoading() {
    return this.renderChildren() || super.renderLoading();
  }

  renderError(error: any) {
    return this.renderChildren() || super.renderError(error);
  }

  renderChildren() {
    return this.props.children && <span>{this.props.children}</span>;
  }

}

export class WorksCounter extends PoetAPIResourceProvider<any, undefined, undefined> {
  poetURL() {
    return Api.Works.Path
  }

  renderElement(works: any, headers: Headers) {
    return (
      <span>
        {headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount))}
      </span>
    )
  }
}

export class BlocksCounter extends PoetAPIResourceProvider<any, undefined, undefined> {
  poetURL() {
    return Api.Blocks.Path
  }

  renderElement(blocks: any, headers: Headers) {
    return (
      <span>
        {headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount))}
      </span>
    )
  }
}

export class WorkHashById extends WorkById {
  renderElement(resource: Work): JSX.Element {
    const hash = resource.attributes
      && resource.attributes.contentHash
      || '(unknown)';
    return <span className="hash-long monospaced">{ hash }</span>;
  }
}

export function AuthorWithLink(props: WorkProps) {
  return props.work && props.work.author ? (
    <ProfileNameWithLink profileId={props.work.author.id}>
      {props.work.author.displayName}
    </ProfileNameWithLink>
  ) : (
    <span>{props.work && props.work.attributes && props.work.attributes.author || 'Unknown Author'}</span>
  );
}

export function WorkNameWithLink(props: WorkProps) {
  const title = props.work && props.work.attributes
    && props.work.attributes.name
    || '(untitled)'
  return <Link to={'/works/' + props.work.id}> { title }</Link>
}

export function WorkType(props: WorkProps) {
  return <span> { props.work.attributes.type || '' } </span>
}

export function normalizeToMillis(timestamp: number) {
  return timestamp < 5000000000 ? timestamp * 1000 : timestamp
}

export function timeFrom(timestamp: number) {
  return moment(normalizeToMillis(timestamp)).fromNow()
}

export function WorkPublishedDate(props: WorkProps) {
  const publishDate = props.work
    && props.work.attributes
    && props.work.attributes.datePublished
  return (<span>{
    publishDate
      ? timeFrom(-(-publishDate))
      : '(unknown publication date)'
  }</span>)
}

export function WorkStampedDate(props: WorkProps) {
  const timestamp = props.work
    && props.work.claimInfo
    && props.work.claimInfo.timestamp
  return (<span>{
    timestamp
      ? timeFrom(timestamp)
      : '(unknown certification date)'
  }</span>)
}

export function WorkCreationDateFromNow(props: WorkProps) {
  const createdAt = props.work
    && props.work.attributes
    && props.work.attributes.dateCreated
  return (<span>{
    createdAt
      ? timeFrom(-(-createdAt))
      : '(unknown creation date)'
  }</span>)
}
