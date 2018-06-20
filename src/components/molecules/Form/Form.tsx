import * as classNames from 'classnames'
import * as React from 'react'

import { Button } from 'components/atoms/Button/Button'
import { Input } from 'components/atoms/Input/Input'

import './Form.scss'
interface FromProps {
  readonly className?: string
  readonly label?: string
  readonly children?: React.ReactNode
  readonly signIn?: boolean
}

export const Form = (props: FromProps) => {
  return <div className={classNames("Form", props.className)}>
      <div className={"Form__header"}>
        <h1 className={"Form__header__label"}>{props.label}</h1>
        <p className={"Form__header__text"}>{props.children}</p>
      </div>
      <form className={"Form__form"}>
        <Input className={"input"} label={"Email"} type={"email"} />
        <Input className={"input2"} label={"Password"} type={"password"} />
        <Button className={"button"} text={props.signIn ? 'SIGN IN' : 'SIGN UP'} />
        <hr className={"hr-text"} data-content="or" />
        <Button className={"button"} signIn={props.signIn} company={"Google"} />
        <Button className={"button"} signIn={props.signIn} company={"Twitter"} />
        <Button className={"button"} signIn={props.signIn} company={"Facebook"} />
      </form>
    </div>;
}
