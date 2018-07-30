import { configureFeature } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'

import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { SignUpContainer } from 'components/containers/SignUp.container'
import { FeatureName } from 'config/features'
import { LandingLayout } from 'pages/Landing/Layout'

const SignUpFeature = configureFeature(LandingLayout, FeatureName.Register, SignUpContainer)

export const SignUpLayout = () => (
  <LoadingPageContainer>
    <SignUpFeature />
  </LoadingPageContainer>
)
