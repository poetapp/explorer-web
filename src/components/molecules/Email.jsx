import React from 'react'
import {pipe} from 'ramda'

import { eventToValue } from 'helpers/eventToValue'

export const Email = ({ onChange, ...props }) => (
  <input
    type="email"
    placeholder="Email"
    onChange={pipe(eventToValue, onChange)}
    required
    {...props}
  />
)