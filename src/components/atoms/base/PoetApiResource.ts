import { ResourceProvider } from 'components/ResourceProvider'
import { Configuration } from 'configuration'

import { UrlObject, isUrlObject, urlObjectToUrl } from 'helpers/UrlObject'

export abstract class PoetAPIResourceProvider<
  Resource,
  PropTypes,
  State = undefined
> extends ResourceProvider<Resource, PropTypes, State> {
  abstract poetURL(): string | UrlObject

  resourceLocator() {
    const poetUrl = this.poetURL()

    if (!isUrlObject(poetUrl) && typeof poetUrl === 'string')
      return { url: `${Configuration.apiUrl}${poetUrl}` }

    if (isUrlObject(poetUrl))
      return { url: `${Configuration.apiUrl}${urlObjectToUrl(poetUrl)}` }

    throw new Error('poetURL must return a string | UrlObject.')
  }
}
