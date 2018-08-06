export enum FeatureName {
  Auth = 'auth',
  Login = 'login',
  NavButtons = 'nav-buttons',
  Register = 'register',
  Footer = 'footer',
}

export const initialFeatures = [
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
    name: FeatureName.Footer,
    isActive: false,
  },
  {
    name: FeatureName.Register,
    isActive: false,
    dependencies: [FeatureName.Auth],
  },
]
