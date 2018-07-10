import * as React from 'react'
import { Link } from 'react-router'

import { Button } from 'components/atoms/Button/Button'

interface NavButtonsProps {
  readonly location?: string
}

export class NavButtons extends React.Component<NavButtonsProps, undefined> {
  render() {
    if (![''].includes(this.props.location)) return null
    return (
      <div className={'button'}>
        <Link to={'/login'}>
          <Button className={'navbar-login'} text={'Log In'} />
        </Link>
        <Link to={'/register'}>
          <Button className={'navbar-signup'} text={'Sign Up'} />
        </Link>
      </div>
    )
  }
}
