import classnames from 'classnames'
import { pipe } from 'ramda'
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'

import { Main } from 'components/templates/Main'
import { PasswordRepeat } from 'components/molecules/PasswordRepeat'
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
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [api, isBusy] = useContext(ApiContext)

  const onSubmit = () => {
    event.preventDefault();
    api.passwordChangeWithOld({ password: newPassword, oldPassword: currentPassword })
      .then(result => result && toast.success('Your password has been updated!'))
  }

  return (
    <section className={classNames.password}>
      <h2>Password</h2>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <PasswordFormInput value={currentPassword} setter={setCurrentPassword} id="currentPassword">Current Password</PasswordFormInput>
        <PasswordFormInput value={newPassword} setter={setNewPassword} id="newPassword">New Password</PasswordFormInput>
        <label htmlFor="passwordRepeat">Confirm New Password</label>
        <PasswordRepeat password={newPassword} id="passwordRepeat"/>
        <button type="submit" disabled={isBusy}>Update Password</button>
      </form>
    </section>
  )
}

const PasswordFormInput = ({ children, value, setter, id }) => (
  <div>
    <label htmlFor={id}>{children}</label>
    <input
      type="password"
      id={id}
      value={value}
      onChange={pipe(eventToValue, setter)}
      required
    />
  </div>
)
