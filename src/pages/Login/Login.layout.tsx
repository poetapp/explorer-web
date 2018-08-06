import { configureFeature } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'

import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { LoginContainer } from 'components/containers/Login.container'
import { FeatureName } from 'config/features'

import { LandingLayout } from '../Landing/Layout'

const LoginFeature = configureFeature(LandingLayout)(FeatureName.Login)(LoginContainer)
export const LoginLayout = () => (
  <LoadingPageContainer>
    <LoginFeature />
  </LoadingPageContainer>
)
