import { getActiveFeatureNames } from '@paralleldrive/feature-toggles'

const Features = [
  {
    name: 'auth',
    isActive: false,
  },
  {
    name: 'login',
    isActive: false,
    dependencies: ['auth'],
  },
]

export const initialFeatures = Features
