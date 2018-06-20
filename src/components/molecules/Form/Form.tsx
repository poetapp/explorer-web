import * as classNames from 'classnames'
import * as React from 'react'

import { Button } from 'components/atoms/Button/Button'
import { Input } from 'components/atoms/Input/Input'

import './Form.scss'
interface FromProps {
  readonly className?: string
  readonly label?: string
  readonly children?: React.ReactNode
}

export const Form = (props: FromProps) => {
  return (
    <div className={classNames('Form', props.className)}>
      <div className={'Form__header'}>
        <h1 className={'Form__header__label'}>{props.label}</h1>
        <p className={'Form__header__text'}>{props.children}</p>
      </div>
      <form className={'Form__form'}>
        <Input className={'input'} label={'Email'} type={'email'} />
        <Input className={'input2'} label={'Password'} type={'password'} />
        <Button className={'button'} text={'Sign Up'} />
        <hr className={'hr-text'} data-content="or" />
        <Button className={'button'} type={'Google'} />
        <Button className={'button'} type={'Twitter'} />
        <Button className={'button'} type={'Facebook'} />
      </form>
    </div>
  )
}
