import classnames from 'classnames'
import { pipe } from 'ramda'
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'

import { Main } from 'components/templates/Main'
import { Email } from 'components/molecules/Email'
import { Password } from 'components/molecules/Password'
import { PasswordRepeat } from 'components/molecules/PasswordRepeat'

import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

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
  const [api, isBusy] = useContext(ApiContext)
  const [account, setAccount] = useContext(SessionContext)
  const [name, setName] = useState(account.name || '')
  const [email, setEmail] = useState(account.email || '')
  const [bio, setBio] = useState(account.bio || '')

  const onSubmit = async () => {
    event.preventDefault()

    if (!account.issuer)
      throw new Error('account.issuer not set')

    const newFields = {
      name,
      email,
      bio,
    }
    await api.accountPatch(account.issuer)(newFields)
    setAccount({
      ...account,
      ...newFields,
    })
    toast.success('Profile updated.')
  }

  return (
    <section className={classNames.password}>
      <h2>Profile</h2>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} />
        <label htmlFor="email">Email</label>
        <Email value={email} onChange={setEmail} id="email" />
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
