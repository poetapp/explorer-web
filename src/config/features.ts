import { getActiveFeatures } from '@paralleldrive/react-feature-toggles'

const Features = [
  {
    name: 'nav-buttons',
    isActive: false,
  },
]

export const initialFeatures = getActiveFeatures(Features)
