import * as React from 'react'
import * as classNames from 'classnames'
import { ClassNameProps } from 'poet-js'

import { Images } from '../../images/Images'

interface SearchInputProps extends ClassNameProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder: string
}

export class SearchInput extends React.Component<SearchInputProps, undefined> {
  render() {
    return (
      <section className={classNames(this.props.className)}>
        <img src={Images.Glass} />
        <input
          type="text"
          value={this.props.value}
          onChange={(event: any) => this.props.onChange(event.target.value)}
          placeholder={this.props.placeholder} />
      </section>
    )
  }
}