import { getActiveFeatures } from '@paralleldrive/react-feature-toggles'

const Features = [
  {
    name: 'auth',
    isActive: false,
  },
]

export const initialFeatures = getActiveFeatures(Features)
