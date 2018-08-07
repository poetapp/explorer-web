import { browserHistory } from 'react-router'
import { Action } from 'redux'
import { takeEvery } from 'redux-saga/effects'

import { Actions } from 'actions'

export interface WorkSearchAction extends Action {
  readonly query?: string
  readonly offset?: number
}

export function workSearchSaga() {
  return function*() {
    yield takeEvery(Actions.Search.SEARCH_CHANGE, searchQueryChange)
    yield takeEvery(Actions.Search.SEARCH_OFFSET, searchOffsetChange)
  }
}

function* searchQueryChange(action: WorkSearchAction): any {
  browserHistory.push({ pathname: 'works', query: { query: action.query } })
}

function* searchOffsetChange(action: WorkSearchAction): any {
  browserHistory.push({
    pathname: 'works',
    query: {
      ...browserHistory.getCurrentLocation().query,
      offset: action.offset,
    },
  })
}
