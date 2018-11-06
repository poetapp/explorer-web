import * as moment from 'moment'
// import { Work } from '@po.et/poet-js'
import * as React from 'react'

import { WorkById } from 'components/atoms/Work'
import { Configuration } from 'configuration'
import { Work } from 'helpers/PoetApi'

import './ContentTab.scss'

export class ContentTab extends WorkById {
  renderElement(work?: Work) {
    console.log('here', work)
    return (
      <section className="content-tab">
        <section className="attributes">
          <table>
            <tbody>
              {work &&
                Object.entries(work.claim)
                  .filter(([key, value]) => key !== 'text' && key !== 'content')
                  .filter(([key, value]) => value.length)
                  .map(this.renderItem, this)}
            </tbody>
          </table>
        </section>
        <section className="content">{work && work.claim.text || work.claim.content}</section>
      </section>
    )
  }

  renderLoading() {
    return this.renderElement()
  }

  private renderItem([key, value]: [string, string]) {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{this.renderItemValue(key, value)}</td>
      </tr>
    )
  }

  private renderItemValue(key: string, value: string) {
    if (this.isDateField(key)) return moment(value).format(Configuration.dateTimeFormat)
    else if (this.isLinkField(key, value)) return <a href={value}>{value}</a>
    else return value
  }

  private isDateField(key: string) {
    return ['datePublished', 'dateCreated', 'dateSubmitted', 'dateModified'].includes(key)
  }

  private isLinkField(key: string, value: string) {
    return ['link'].includes(key) || value.startsWith('www') || value.startsWith('http')
  }
}
