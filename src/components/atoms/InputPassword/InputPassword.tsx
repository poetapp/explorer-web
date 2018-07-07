import * as classNames from 'classnames'
import * as React from 'react'

import { getParsedForm } from 'helpers/helpers'
import { Input } from '../Input/Input'
import './InputPassword.scss'

interface ComplexityPassword {
  readonly lowerCase: number
  readonly upperCase: number
  readonly numeric: number
  readonly symbol: number
}

interface InputPasswordProps {
  readonly className?: string
  readonly label?: string
  readonly type?: string
  readonly placeholder?: string
  readonly onChange?: (event: Event) => void
  readonly inputRef?: any
  readonly name?: string
  readonly minLength?: number
  readonly maxLength?: number
  readonly required?: boolean
  readonly complexity?: ComplexityPassword
}

const onChange = (event: any, onChange: any, complexity: ComplexityPassword) => {
  event.preventDefault()
  const form = event.target.form
  const { currentData, elements } = getParsedForm(form)
  validatePassword(complexity, event.target)
  if (typeof onChange === 'function') onChange(currentData, elements)
}

const validatePassword = (complexity: ComplexityPassword, target: HTMLInputElement) => {
  const value = target.value
  const message = {
    lowerCase: `${complexity.lowerCase} lowercase character \n`,
    upperCase: `${complexity.upperCase} uppercase character \n`,
    numeric: `${complexity.numeric} numeric character \n`,
    symbol: `${complexity.symbol} symbol character \n`,
  }

  const complexityPatterns = {
    lowerCase: /[a-z]/g,
    upperCase: /[A-Z]/g,
    numeric: /[0-9]/g,
    symbol: /[^a-zA-Z0-9]/g,
  }

  const entries = Object.entries(complexity)
  const validations: ReadonlyArray<string> = entries.reduce(
    (acum: ReadonlyArray<string>, validation: [keyof ComplexityPassword, number]): ReadonlyArray<string> => {
      const typeComplexity = validation[0]
      const valueComplexity = validation[1]
      const pattern = complexityPatterns[typeComplexity]
      return !((value.match(pattern) || []).length >= valueComplexity) ? [...acum, message[typeComplexity]] : acum
    },
    []
  )

  const messages = validations.length > 1 ? `Required, ${validations.join(', ')}` : ''
  value === '' ? target.setCustomValidity('') : target.setCustomValidity(messages)
}

export const InputPassword = (props: InputPasswordProps) => (
  <Input
    className={classNames('Input-password', props.className)}
    label={props.label}
    type={props.type}
    required={props.required}
    placeholder={props.placeholder}
    name={props.name}
    maxLength={props.maxLength ? props.maxLength : -1}
    minLength={props.minLength ? props.minLength : -1}
    inputRef={props.inputRef}
    onKeyUp={e => onChange(e, props.onChange, props.complexity)}
  />
)
