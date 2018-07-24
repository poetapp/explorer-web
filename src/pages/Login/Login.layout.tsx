import { configureFeature } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'

import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { LoginContainer } from 'components/containers/Login.container'

import { LandingLayout } from '../Landing/Layout'

const LoginFeature = configureFeature(LandingLayout, 'login', LoginContainer)
export const LoginLayout = () => (
  <LoadingPageContainer>
    <LoginFeature />
  </LoadingPageContainer>
)
