import * as React from 'react'

import PageLoader from './PageLoader'
import { ReducerDescription } from './PageLoader'

abstract class SimpleLoader extends PageLoader<Object, Object>{

  initialState() {
    return {};
  }

  reducerHook<State>(): ReducerDescription<Object> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return undefined;
  }
}

export default SimpleLoader
