import * as React from 'react'
import * as classNames from 'classnames'
import './Button.scss'


interface ButtonProps {
  readonly className?: string
  readonly text?: string
  readonly disabled?: boolean
  readonly onClick?: any
  readonly type?: 'primary' | 'danger'
}


export const Button = (props: ButtonProps) => {
  return <button
    className={classNames('Button', props.className, `Button__${props.type}`)}
    disabled={props.disabled}
    onClick={props.onClick}
    > {props.text} </button>
}
