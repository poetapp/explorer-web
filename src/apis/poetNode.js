import { ApiClient } from 'helpers/ApiClient'

export const PoetNodeApi = (url) => ApiClient({
  url,
  resources,
})

const resources = {
  works: {
    get: true,
    find: true,
  }
}
