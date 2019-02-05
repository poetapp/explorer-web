import React from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import classNames from './Login.scss'

export const Login = () => {
  return (
    <section className={classNames.login}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Log Into My Account</h1>
      <h2>Log in to make, view, and manage your claims on the Po.et Network.</h2>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Password" />
      <button>Log In</button>
    </section>
  )
}
