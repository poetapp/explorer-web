import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { LoginContainer } from 'components/containers/Login.container'
import * as React from 'react'

export const LoginLayout = () => (
  <LoadingPageContainer>
    <LoginContainer />
  </LoadingPageContainer>
)
