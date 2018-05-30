import * as classNames from 'classnames'
import * as React from 'react'
import './Button.scss'

interface ButtonProps {
  readonly className?: string
  readonly text?: string
  readonly disabled?: boolean
  readonly onClick?: any
  readonly type?: 'primary' | 'danger'
}

export const Button = (props: ButtonProps) => (
  <button
    className={classNames('Button', props.className, `Button__${props.type}`)}
    {...(props.disabled ? { disabled: 'disabled' } : {})}
    {...(props.onClick ? { onClick: props.onClick } : {})}
  >
    {props.text}
  </button>
)
