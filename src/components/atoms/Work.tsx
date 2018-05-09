/* tslint:disable:max-classes-per-file */
import { Api } from 'helpers/PoetApi'
import * as React from 'react'
import { Link } from 'react-router'

import { SelectWorkById } from './Arguments'
import { PoetAPIResourceProvider } from './base/PoetApiResource'

interface WorkProps {
  readonly work: Api.WorkById.Response
}

export abstract class WorkById<State = undefined> extends PoetAPIResourceProvider<
  Api.WorkById.Response,
  SelectWorkById,
  State
> {
  poetURL() {
    return Api.WorkById.url(this.props.workId)
  }
}

export class WorkNameById extends WorkById {
  renderElement(resource: Api.WorkById.Response) {
    const title = (resource.attributes && resource.attributes.name) || '(untitled)'
    return <span>{title}</span>
  }
}

export class WorkNameWithLinkById extends WorkById {
  renderElement(work: Api.WorkById.Response) {
    return <WorkNameWithLink work={work} />
  }

  renderLoading() {
    return this.renderChildren() || super.renderLoading()
  }

  renderError(error: any) {
    return this.renderChildren() || super.renderError(error)
  }

  renderChildren() {
    return this.props.children && <span>{this.props.children}</span>
  }
}

export function AuthorWithLink(props: WorkProps) {
  return <span>{(props.work && props.work.attributes && props.work.attributes.author) || 'Unknown Author'}</span>
}

export function WorkNameWithLink(props: WorkProps) {
  const title = (props.work && props.work.attributes && props.work.attributes.name) || '(untitled)'
  return <Link to={'/works/' + props.work.id}> {title}</Link>
}

export function WorkType(props: WorkProps) {
  return <span> {props.work.attributes.type || ''} </span>
}
