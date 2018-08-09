import * as React from 'react'
import { Link } from 'react-router'

import { Button } from 'components/atoms/Button/Button'

export const NavButtons = () => {
  return (
    <div className={'button'}>
      <Link to={'/login'}>
        <Button className={'navbar-login'} text={'Log In'} />
      </Link>
      <Link to={'/sign-up'}>
        <Button className={'navbar-signup'} text={'Sign Up'} />
      </Link>
    </div>
  )
}
