import { StoreCreator } from 'redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => StoreCreator
  }
}
