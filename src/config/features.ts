import { getActiveFeatures } from '@paralleldrive/react-feature-toggles'

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
  {
    name: 'register',
    isActive: false,
    dependencies: ['auth'],
  },
]

export const initialFeatures = getActiveFeatures(Features)
