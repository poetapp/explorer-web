import * as classNames from 'classnames'
import * as moment from 'moment'
import { ClaimType } from 'poet-js'
import * as React from 'react'

import 'extensions/Map'

import { AuthorWithLink, WorkById } from 'components/atoms/Work'
import { Configuration } from 'configuration'
import { Api } from 'helpers/PoetApi'

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
        publicKey: '',
        signature: '',
        attributes: {
          name: 'Work',
          datePublished: Date.now().toString(),
          dateCreated: Date.now().toString(),
          dateModified: Date.now().toString(),
          author: '',
          lastModified: '',
          content: '',
          tags: '',
        },
      },
      true
    )
  }

  private renderOverview(work: Api.WorkById.Response, isLoading?: boolean) {
    if (!work) return null

    document.title = work.attributes.name || '(Untitled Work)'

    const tableData = new Map<string, any>()

    if (work.attributes.datePublished)
      tableData.set('Published', moment(new Date(work.attributes.datePublished)).format(Configuration.dateFormat))

    if (work.attributes.dateModified)
      tableData.set('Last Modified', moment(new Date(work.attributes.dateModified)).format(Configuration.dateFormat))

    if (work.attributes.tags && work.attributes.tags.length) tableData.set('Tags', work.attributes.tags)

    return (
      <div className={classNames('overview', isLoading && 'loading')}>
        <h1>{work.attributes.name || '(Untitled Work)'}</h1>
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
