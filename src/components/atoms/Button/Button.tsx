import * as classNames from 'classnames'
import * as React from 'react'
import './Button.scss'
import { Images } from 'images/Images'

interface ButtonProps {
  readonly className?: string
  readonly text?: string
  readonly onClick?: any
  readonly type?: string
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={classNames('Button', props.className, `Button__${props.type}`)}
      onClick={props.onClick}>
      {props.text ? props.text : props.type ? `SIGN UP WITH ${props.type.toUpperCase()}` : ''}
    </button>
  )
}
