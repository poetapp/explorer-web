import { browserHistory } from "react-router";
import { Action } from 'redux';
import { takeEvery } from 'redux-saga'

import { Actions } from '../actions/index';

export interface WorkSearchAction extends Action {
  readonly query?: string;
  readonly offset?: number;
}

export function workSearchSaga() {
  return function*() {
    yield takeEvery(Actions.Search.Change, searchQueryChange);
    yield takeEvery(Actions.Search.Offset, searchOffsetChange);
  }
}

function* searchQueryChange(action: WorkSearchAction): any {
  browserHistory.push({pathname: 'works', query: { query: action.query }})
}

function* searchOffsetChange(action: WorkSearchAction): any {
  browserHistory.push({pathname: 'works', query: { ...browserHistory.getCurrentLocation().query, offset: action.offset }})
}