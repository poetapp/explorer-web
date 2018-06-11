import * as classNames from 'classnames'
import * as React from 'react'
import './Button.scss'

interface ButtonProps {
  readonly className?: string
  readonly text?: string
  readonly disabled?: boolean
  readonly onClick?: any
  readonly type?: 'primary' | 'danger'
  readonly loading?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={classNames('Button', props.className, `Button__${props.type}`)}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? 'loading' : props.text}
    </button>
  )
}
