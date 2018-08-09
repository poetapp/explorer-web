export enum FeatureName {
  Auth = 'auth',
  Login = 'login',
  NavButtons = 'nav-buttons',
  SignUp = 'sign-up',
  Footer = 'footer',
  Avatar = 'avatar'
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
    name: FeatureName.SignUp,
    isActive: false,
    dependencies: [FeatureName.Auth],
  },
  {
    name: FeatureName.Avatar,
    isActive: false,
    dependencies: [FeatureName.Auth],
  },
]
