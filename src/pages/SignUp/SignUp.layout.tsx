import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { SignUpContainer } from 'components/containers/SignUp.container'
import * as React from 'react'

export const SignUpLayout = () => (
  <LoadingPageContainer>
    <SignUpContainer />
  </LoadingPageContainer>
)
