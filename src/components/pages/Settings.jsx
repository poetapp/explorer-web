import { pipe } from 'ramda'
import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Settings.scss'

export const Settings = () => (
  <Main>
    <section className={classNames.settings}>
      <header>
        <h1>Profile Settings</h1>
      </header>
      <main>
        <Password />
      </main>
    </section>
  </Main>
)


const Password = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [changedPassword, setChangedPassword] = useState(null)

  const onSubmit = ({ currentPassword, newPassword }) => {
    api.passwordChangeWithOld({ password: newPassword, oldPassword: currentPassword }).then(setChangedPassword)
  }

  return (
    <section>
      <PasswordForm onSubmit={onSubmit} disabled={isBusy}/>
    </section>
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
    <section className={classNames.password}>
      <h2>Password</h2>
      <form onSubmit={onSubmitWrapper}>
        <PasswordFormInput value={currentPassword} setter={setCurrentPassword} id="currentPassword">Current Password</PasswordFormInput>
        <PasswordFormInput value={newPassword} setter={setNewPassword} id="newPassword">New Password</PasswordFormInput>
        <PasswordFormInput value={newPasswordConfirmation} setter={setNewPasswordConfirmation} id="confirmNewPassword" customValidity={customValidity}>Confirm New Password</PasswordFormInput>
        <button type="submit" disabled={disabled}>Update Password</button>
      </form>
    </section>
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