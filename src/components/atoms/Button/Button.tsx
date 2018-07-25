import * as classNames from 'classnames'
import * as React from 'react'

import './Button.scss'

interface ButtonProps {
  readonly className?: string
  readonly text?: string
  readonly onClick?: any
  readonly company?: string
  readonly signIn?: boolean
  readonly disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={classNames('Button', props.className, `Button__${props.company}`)}
      onClick={props.onClick}
    >
      {props.text
        ? props.text
        : props.signIn && props.company
          ? `LOG IN WITH ${props.company.toUpperCase()}`
          : props.company
            ? `SIGN UP WITH ${props.company.toUpperCase()}`
            : ''}
    </button>
  )
}
