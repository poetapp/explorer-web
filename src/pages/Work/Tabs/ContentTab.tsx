import * as React from 'react'
import * as moment from 'moment'
import { Work } from 'poet-js'

import { Configuration } from 'configuration'
import { WorkById } from 'components/atoms/Work'

import './ContentTab.scss'

export class ContentTab extends WorkById {

  renderElement(work?: Work) {
    return (
      <section className="content-tab">
        <section className="attributes">
          <table>
            <tbody>
            {
              work && Object.entries(work.attributes)
                .filter(([key, value]) => key !== 'content')
                .map(this.renderItem, this)
            }
            </tbody>
          </table>
        </section>
        <section className="content">{ work && work.attributes.content }</section>
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
    if (this.isDateField(key))
      return moment(parseInt(value)).format(Configuration.dateTimeFormat)
    else if (this.isLinkField(key, value))
      return <a href={ value }>{ value }</a>
    else
      return value
  }

  private isDateField(key: string) {
    return ['datePublished', 'dateCreated', 'dateSubmitted', 'dateModified'].includes(key)
  }

  private isLinkField(key: string, value: string) {
    return ['link'].includes(key) || value.startsWith('www') || value.startsWith('http')
  }
}