import { pipe } from 'ramda'
import React, { useState, useRef, useEffect } from 'react'

import { eventToValue } from 'helpers/eventToValue'

export const PasswordRepeat = ({ password, ...props }) => {
  const [value, setValue] = useState('')
  const ref = useRef()

  useEffect(() => {
    if (password !== value)
      ref.current.setCustomValidity('Passwords must match.')
    else
      ref.current.setCustomValidity('')
  }, [password, value])

  return (
    <input
      ref={ref}
      type="password"
      placeholder="Password"
      value={value}
      onChange={pipe(eventToValue, setValue)}
      required
      {...props}
    />
  )
}