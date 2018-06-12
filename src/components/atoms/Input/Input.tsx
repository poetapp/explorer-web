import * as classNames from 'classnames'
import * as React from 'react'
import './Input.scss'
import { Images } from 'images/Images'

interface InputProps {
  readonly className?: string
  readonly label?: string
  readonly type?: string
  readonly placeholder?: string
}

export const Input = (props: InputProps) => {
  return (
    <div className={classNames('Input', props.className)}>
      <div className={'Input__label'}><label htmlFor='input'>{props.label}</label></div>
      <input
        type={props.type}
        id='input'
        placeholder={props.placeholder}
        className={'Input__input'}
      />
    </div>
  )
}
