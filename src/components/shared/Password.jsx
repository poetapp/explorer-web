import React from 'react'
import {pipe} from 'ramda'

import { eventToValue } from 'helpers/eventToValue'

export const Password = ({ onChange, ...props }) => (
  <input
    type="password"
    placeholder="Password"
    onChange={pipe(eventToValue, onChange)}
    minLength={10}
    maxLength={30}
    required
    {...props}
  />
)