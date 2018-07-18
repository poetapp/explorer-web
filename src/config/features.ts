import { getActiveFeatures } from '@paralleldrive/react-feature-toggles'

export enum FeatureName {
  Auth = 'auth',
  Login = 'login',
  NavButtons = 'nav-buttons',
  Register = 'register',
}

const Features = [
  {
    name: FeatureName.Auth,
    isActive: false,
  },
  {
    name: FeatureName.Login,
    isActive: false,
    dependencies: [FeatureName.Auth],
  },
  {
    name: FeatureName.NavButtons,
    isActive: false,
    dependencies: [FeatureName.Login, FeatureName.Auth],
  },
  {
    name: FeatureName.Register,
    isActive: false,
    dependencies: [FeatureName.Auth],
  },
]

export const initialFeatures = getActiveFeatures(Features)
