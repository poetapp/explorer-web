import classnames from 'classnames'
import { pipe } from 'ramda'
import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Main } from 'components/templates/Main'
import { Email } from 'components/shared/Email'
import { Password } from 'components/shared/Password'
import { PasswordRepeat } from 'components/shared/PasswordRepeat'

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
        <PoeWalletForm />
        <WalletForm />
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
    <section className={classNames.profile}>
      <h2>Profile</h2>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} />
        <label htmlFor="email">Email</label>
        <Email value={email} onChange={setEmail} id="email" disabled={true} />
        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" value={bio} onChange={pipe(eventToValue, setBio)} />
        <button type="submit" disabled={isBusy}>Submit</button>
      </form>
    </section>
  )
}

const PoeWalletForm = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [account, setAccount] = useContext(SessionContext)
  const [poeAddress, setPoeAddress] = useState(account.poeAddress || '')
  const [poeAddressMessage, setPoeAddressMessage] = useState('')
  const [poeSignature, setPoeSignature] = useState(account.poeSignature || '')

  const onSubmit = async () => {
    event.preventDefault()

    if (!account.issuer)
      throw new Error('account.issuer not set')

    const patchedAccount = await api.accountPatch(account.issuer)({ poeAddress, poeSignature })
    setAccount({
      ...account,
      ...patchedAccount,
    })
    toast.success('POE Wallet updated.')
  }

  useEffect(() => {
    if (api && !account.poeAddressVerified)
      api.accountPoeChallengePost(account.issuer)().then(_ => _.poeAddressMessage).then(setPoeAddressMessage)
  }, [api, account])

  return (
    <section className={classNames.wallet}>
      <header>
        <h2>Connect your Wallet</h2>
        <h3>Once you connect your wallet with a POE balance, a whole world of opportunity opens up to you.</h3>
      </header>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <label htmlFor="poeAddress">POE Address</label>
        <input type="text" id="poeAddress" value={poeAddress} onChange={pipe(eventToValue, setPoeAddress)} />
        <label htmlFor="poeAddress">POE Address Message</label>
        <input type="text" id="poeAddressMessage" value={poeAddressMessage} readOnly />
        <label htmlFor="poeAddress">POE Address Signature</label>
        <input type="text" id="poeAddressSignature" value={poeSignature} onChange={pipe(eventToValue, setPoeSignature)} />
        <label htmlFor="poeAddressVerified">POE Address Verified</label>
        <input type="text" id="poeAddressVerified" value={account.poeAddressVerified ? 'Yes' : 'No'} readOnly />
        <button type="submit" disabled={isBusy}>Save</button>
      </form>
    </section>
  )
}

const WalletForm = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [account, setAccount] = useContext(SessionContext)
  const [ethereumAddress, setEthereumAddress] = useState(account.ethereumAddress || '')

  const onSubmit = async () => {
    event.preventDefault()

    if (!account.issuer)
      throw new Error('account.issuer not set')

    await api.accountPatch(account.issuer)({ ethereumAddress })
    setAccount({
      ...account,
      ethereumAddress,
    })
    toast.success('Wallet updated.')
  }

  return (
    <section className={classNames.wallet}>
      <h2>Wallet</h2>
      <form onSubmit={onSubmit} className={classnames({ isBusy })}>
        <label htmlFor="eth">ETH Address</label>
        <input type="text" id="eth" value={ethereumAddress} onChange={pipe(eventToValue, setEthereumAddress)} />
        <button type="submit" disabled={isBusy}>Save</button>
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
