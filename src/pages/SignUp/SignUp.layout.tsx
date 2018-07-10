import * as React from 'react'

import { configureFeature } from '@paralleldrive/react-feature-toggles'
import { LoadingPageContainer } from 'components/containers/LoadingPage.container'
import { SignUpContainer } from 'components/containers/SignUp.container'
import { LandingLayout } from '../Landing/Layout'

const SignUpFeature = configureFeature(LandingLayout, 'register', SignUpContainer)

export const SignUpLayout = () => (
  <LoadingPageContainer>
    <SignUpFeature />
  </LoadingPageContainer>
)
