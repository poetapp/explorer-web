import { pipe } from 'ramda'
import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './NewClaim.scss'

export const Settings = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [changedPassword, setChangedPassword] = useState(null)

  const onSubmit = ({ password, oldPassword }) => {
    api.passwordChangeWithOld({ password, oldPassword }).then(setChangedPassword)
  }

  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        <PasswordForm onSubmit={onSubmit} disabled={isBusy}/>
      </section>
    </Main>
  )
}

const PasswordForm = ({ onSubmit, disabled }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

  const onSubmitWrapper = event => {
    event.preventDefault();
    onSubmit({
      currentPassword,
      newPassword,
    })
  }

  const customValidity =
    newPassword === newPasswordConfirmation
      ? ''
      : 'Passwords must match.'

  return (
    <form onSubmit={onSubmitWrapper}>
      <PasswordFormInput value={currentPassword} setter={setCurrentPassword} id="currentPassword">Current Password</PasswordFormInput>
      <PasswordFormInput value={newPassword} setter={setNewPassword} id="newPassword">New Password</PasswordFormInput>
      <PasswordFormInput value={newPasswordConfirmation} setter={setNewPasswordConfirmation} id="confirmNewPassword" customValidity={customValidity}>Confirm New Password</PasswordFormInput>
      <button type="submit" disabled={disabled}>{ disabled ? 'Please wait...' : 'Submit'}</button>
    </form>
  )
}

const PasswordFormInput = ({ children, value, setter, id, customValidity = '' }) => {
  const input = useRef()

  useEffect(() => {
    if (input.current)
      input.current.setCustomValidity(customValidity)
  }, [customValidity])

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input
        type="password"
        id={id}
        value={value}
        onChange={pipe(eventToValue, setter)}
        required
        ref={input}
      />
    </div>
  )
}