import * as React from 'react'
import * as moment from 'moment'
import * as classNames from 'classnames'
import { ClaimTypes, Work } from 'poet-js'

import '../../extensions/Map'

import { Configuration } from '../../configuration'
import { AuthorWithLink, WorkById } from '../../components/atoms/Work'

import './Overview.scss'

export class Overview extends WorkById {

  renderElement(work: Work, headers: Headers) {
    return this.renderOverview(work)
  }

  renderLoading() {
    return this.renderOverview({
      id: '',
      type: ClaimTypes.WORK,
      publicKey: '',
      signature: '',
      attributes: {
        name: 'Work',
        datePublished: Date.now().toString(),
        dateCreated: Date.now().toString(),
        dateModified: Date.now().toString(),
        mediaType: '',
        articleType: '',
        author: '',
        lastModified: '',
        contentHash: '',
        tags: '',
        type: ''
      }
    }, true)
  }

  private renderOverview(work: Work, isLoading?: boolean) {
    if (!work) {
      return null
    }

    document.title = work.attributes.name || '(Untitled Work)'

    const tableData = new Map<string, any>()

    work.attributes.datePublished &&
    tableData.set('Published', moment(parseInt(work.attributes.datePublished, 10)).format(Configuration.dateFormat))

    work.attributes.dateModified &&
    tableData.set('Last Modified', moment(parseInt(work.attributes.dateModified, 10)).format(Configuration.dateFormat))

    work.attributes.tags && tableData.set('Tags', work.attributes.tags || [])

    tableData.set('Type', work.attributes.mediaType || 'Unknown')

    work.attributes.articleType &&
    tableData.set('Article type', work.attributes.articleType || 'Unknown')

    return (
      <div className={classNames('overview', isLoading && 'loading')}>
        <h1>{work.attributes.name || '(Untitled Work)'}</h1>
        <table>
          <tbody>
          <tr key="author">
            <td>Author</td>
            <td><AuthorWithLink work={work} /></td>
          </tr>
          { tableData.toKeyValueArray().map(this.renderRow, this) }
          </tbody>
        </table>
      </div>
    )
  }

  private renderRow({key, value}: KeyValue<string, string>) {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  }
}