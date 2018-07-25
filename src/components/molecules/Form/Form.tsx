import * as classNames from 'classnames'
import * as React from 'react'

import { Button } from 'components/atoms/Button/Button'
import { getParsedForm } from 'helpers/helpers'

import './Form.scss'

interface FromProps {
  readonly className?: string
  readonly header?: string
  readonly children?: React.ReactNode
  readonly signIn?: boolean
  readonly onValidate?: (data: any, elements: any) => boolean
  readonly onSubmit?: (event: any, elements: any) => any
  readonly formRef?: any
  readonly buttonDisabled?: boolean
  readonly label?: React.ReactNode
}

export class Form extends React.Component<FromProps, undefined> {
  readonly onSubmit = (event: any, submit = (data: object, elements: any) => ({})): void => {
    event.preventDefault()
    const form = event.target
    const { currentData, elements } = getParsedForm(form)
    submit(currentData, elements)
  }

  render(): JSX.Element {
    const { buttonDisabled, label, className, header, children, signIn, onSubmit, formRef } = this.props
    return (
      <div className={classNames('Form', className)}>
        <div className={'Form__header'}>
          <h1 className={'Form__header__label'}>{header}</h1>
          <div className={'Form__header__text'}>{label}</div>
        </div>
        <form className={'Form__form'} onSubmit={event => this.onSubmit(event, onSubmit)} ref={formRef}>
          {children}
          <Button disabled={buttonDisabled} className={'button'} text={signIn ? 'Log In' : 'Sign Up'} />
        </form>
      </div>
    )
  }
}
