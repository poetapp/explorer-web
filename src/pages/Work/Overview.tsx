import * as classNames from 'classnames'
import * as moment from 'moment'
// import { ClaimType } from '@po.et/poet-js'
import * as React from 'react'

import 'extensions/Map'

import { AuthorWithLink, WorkById } from 'components/atoms/Work'
import { Configuration } from 'configuration'
import { Api, ClaimType } from 'helpers/PoetApi'

import './Overview.scss'

export class Overview extends WorkById {
  renderElement(work: Api.WorkById.Response, headers: Headers) {
    return this.renderOverview(work)
  }

  renderLoading() {
    return this.renderOverview(
      {
        id: '',
        type: ClaimType.Work,
        issuer: '',
        '@context': '',
        issuanceDate: '',
        claim: {
          name: 'Work',
          datePublished: Date.now().toString(),
          dateCreated: Date.now().toString(),
          dateModified: Date.now().toString(),
          author: '',
          lastModified: '',
          text: '',
          tags: '',
        },
      },
      true,
    )
  }

  private renderOverview(work: Api.WorkById.Response, isLoading?: boolean) {
    if (!work) return null

    document.title = work.claim.name || '(Untitled Work)'

    const tableData = new Map<string, any>()

    if (work.claim.datePublished)
      tableData.set('Published', moment(new Date(work.claim.datePublished)).format(Configuration.dateFormat))

    if (work.claim.dateModified)
      tableData.set('Last Modified', moment(new Date(work.claim.dateModified)).format(Configuration.dateFormat))

    if (work.claim.tags && work.claim.tags.length) tableData.set('Tags', work.claim.tags)

    return (
      <div className={classNames('overview', isLoading && 'loading')}>
        <h1>{work.claim.name || '(Untitled Work)'}</h1>
        <table>
          <tbody>
            <tr key="author">
              <td>Author</td>
              <td>
                <AuthorWithLink work={work} />
              </td>
            </tr>
            {tableData.toKeyValueArray().map(this.renderRow, this)}
          </tbody>
        </table>
      </div>
    )
  }

  private renderRow({ key, value }: KeyValue<string, string>) {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  }
}
