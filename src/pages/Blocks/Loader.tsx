import * as React from 'react'
import { Route } from 'react-router'
import { select, call, put } from 'redux-saga/effects'

import { Configuration } from '../../configuration';
import { blocks } from '../../selectors/blocks'
import PageLoader, { ReducerDescription } from '../../components/PageLoader'
import { Actions } from '../../actions/index'
import { BlocksLayout } from './Layout'

async function fetchBlocks() {
  return await (await fetch(Configuration.api.explorer + '/blocks')).json()
}

export class Blocks extends PageLoader<Object, Object> {

  component = BlocksLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/blocks" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<null> {
    return null;
  }

  sagaHook(): any {
    return function* rootSaga() {
      const blockInfo = yield select(blocks);
      if (!blockInfo.length) {
        const blockInfo = yield call(fetchBlocks);
        yield put({ type: Actions.blockInfoReceived, payload: blockInfo })
      }
    };
  }

  select(state: any, ownProps: any): Object {
    return blocks(state);
  }

  mapDispatchToProps(): Object {
    return null;
  }
}
