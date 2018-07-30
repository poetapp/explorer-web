export const initialFeatures = [
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
