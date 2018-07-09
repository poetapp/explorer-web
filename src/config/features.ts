import { getActiveFeatures } from '@paralleldrive/react-feature-toggles'

const Features = [
  {
    name: 'landing-buttons',
    isActive: false,
  },
]

export const initialFeatures = getActiveFeatures(Features)
