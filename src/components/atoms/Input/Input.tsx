import * as classNames from 'classnames'
import * as React from 'react'
import './Input.scss'

interface InputProps {
  readonly className?: string
  readonly label?: string
  readonly type?: string
  readonly placeholder?: string
  readonly onChange?: (event: Event) => void
  readonly inputRef?: any
}

export const Input = (props: InputProps) => {
  return (
    <div className={classNames('Input', props.className)}>
      <div className={'Input__label'}>
        <label htmlFor="input">{props.label}</label>
      </div>
      <input
        ref={props.inputRef}
        onChange={e => this.onEvent(e, props.onChange, this.props)}
        type={props.type}
        id="input"
        placeholder={props.placeholder}
        className={'Input__input'}
      />
    </div>
  )
}
