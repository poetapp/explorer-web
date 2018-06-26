import * as classNames from 'classnames'
import * as React from 'react'

import { getParsedForm } from 'helpers/helpers'
import './Input.scss'

interface InputProps {
  readonly className?: string
  readonly label?: string
  readonly type?: string
  readonly placeholder?: string
  readonly onChange?: (event: Event) => void
  readonly inputRef?: any
}

export class Input extends React.Component<InputProps, undefined> {
  readonly onEvent = (
    event: any,
    callback: (event: Event, currentData: object, elements: object) => void,
    props: InputProps
  ): void => {
    if (props.type !== 'checkbox') event.preventDefault()
    const form = event.target.form
    const { currentData, elements } = getParsedForm(form)
    if (typeof callback === 'function') callback(event, currentData, elements)
  }

  render(): JSX.Element {
    const { className, label, onChange, inputRef, type, placeholder } = this.props
    return (
      <div className={classNames('Input', className)}>
        <div className={'Input__label'}>
          <label htmlFor="input">{label}</label>
        </div>
        <input
          ref={inputRef}
          onChange={e => this.onEvent(e, onChange, this.props)}
          type={type}
          placeholder={placeholder}
          className={'Input__input'}
        />
      </div>
    )
  }
}
