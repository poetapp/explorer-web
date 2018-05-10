import { FetchStatus } from '../enums/FetchStatus'
import { PoetAppState } from '../store/PoetAppState'

export function getResourceState(url: any) {
  return function(state: PoetAppState): FetchStatus {
    return state.fetch[url] ? state.fetch[url].status : FetchStatus.Uninitialized
  }
}
