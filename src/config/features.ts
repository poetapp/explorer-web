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
    name: 'nav-buttons',
    isActive: false,
    dependencies: ['login', 'auth'],
  },
]

export const initialFeatures = getActiveFeatures(Features)
