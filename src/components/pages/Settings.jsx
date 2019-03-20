import classnames from 'classnames'
import { pipe } from 'ramda'
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'

import { Main } from 'components/templates/Main'
import { Password } from 'components/molecules/Password'
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
        <ProfileForm />
        <PasswordForm />
      </main>
    </section>
  </Main>
)

const ProfileForm = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  const onSubmit = () => {
    event.preventDefault()
  }

  return (
    <section className={classNames.password}>
      <h2>Profile</h2>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={pipe(eventToValue, setEmail)} />
        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" value={bio} onChange={pipe(eventToValue, setBio)} />
        <button type="submit" disabled={isBusy}>Submit</button>
      </form>
    </section>
  )
}


const PasswordForm = () => {
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
        <label htmlFor="currentPassword">Current Password</label>
        <Password value={currentPassword} onChange={setCurrentPassword} id="currentPassword"/>
        <label htmlFor="newPassword">New Password</label>
        <Password password={newPassword} onChange={setNewPassword} id="newPassword"/>
        <label htmlFor="passwordRepeat">Confirm New Password</label>
        <PasswordRepeat password={newPassword} id="passwordRepeat"/>
        <button type="submit" disabled={isBusy}>Update Password</button>
      </form>
    </section>
  )
}
