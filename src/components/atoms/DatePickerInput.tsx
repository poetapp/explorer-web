/* tslint:disable:no-empty */
import * as classNames from 'classnames'
import { ClassNameProps } from 'components/ClassNameProps'
import * as React from 'react'

import { Images } from 'images/Images'

import './DatePickerInput.scss'

interface DatePickerInputProps extends ClassNameProps {
  readonly value?: string
  readonly onClick?: () => void
  readonly onBlur?: () => void
}

export class DatePickerInput extends React.Component<DatePickerInputProps, undefined> {
  focus() {}

  render() {
    return (
      <button
        className={classNames('calendar-button', this.props.className)}
        onClick={this.props.onClick}
        onBlur={this.props.onBlur}
      >
        <span>{this.props.value || 'Select a Date'}</span>
        <img src={Images.Calendar} />
      </button>
    )
  }
}
