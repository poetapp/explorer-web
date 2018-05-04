import * as React from 'react'

import { WorkById } from 'components/atoms/Work'
import { Api } from 'helpers/PoetApi'
import { Overview } from './Overview'
import { WorkTabs } from './WorkTabs'

import './Layout.scss'

export class WorkLayout extends WorkById {
  renderElement(work: Api.WorkById.Response) {
    if (!work) return this.render404()
    return (
      <section className="container page-work">
        <div className="row">
          <div className="col-xs-7">
            <Overview workId={this.props.workId} />
          </div>
        </div>
        <WorkTabs id={this.props.workId} />
      </section>
    )
  }

  render404() {
    return (
      <section className="container page-work not-found">
        <div>
          Work not found? It takes 10 minutes to sync across nodes so check back
          soon!
        </div>
      </section>
    )
  }

  componentWillUnmount() {
    document.title = 'Poet'
  }
}
