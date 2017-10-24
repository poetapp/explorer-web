import { PoetAppState } from '../store/PoetAppState'
import { FetchStatus } from '../enums/FetchStatus'

export function getResourceState(url: any) {
  return function(state: PoetAppState): FetchStatus {
    return state.fetch[url] ? state.fetch[url].status : FetchStatus.Uninitialized
  }
}
