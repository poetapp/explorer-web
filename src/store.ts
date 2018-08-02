import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
const { persistStore, autoRehydrate } = require('redux-persist')
import { fork } from 'redux-saga/effects'

import PageLoader from 'components/PageLoader'
import 'extensions/Array'

import pageCreators from './pages'
import reducers from './reducers'
import sagaList from './sagas'

function bindSagas(pages: Array<PageLoader<any, any>>) {
  const sagas = pages
    .map(page => page.sagaHook)
    .concat(sagaList)
    .map(saga => saga())
    .filterTruthy()

  return function*() {
    for (const saga of sagas) yield fork(saga)
  }
}

function bindReducers(pages: Array<PageLoader<any, any>>): any {
  const pageReducers = pages
    .map(page => page.reducerHook())
    .filterTruthy()
    .toObject(reducerDescription => ({
      key: reducerDescription.subState,
      value: reducerDescription.reducer,
    }))

  return { ...pageReducers, ...reducers }
}

function bindInitialState(pages: Array<PageLoader<any, any>>): any {
  const initialState = pages
    .map(page => ({
      reducerDescription: page.reducerHook(),
      initialState: page.initialState(),
    }))
    .filter(({ reducerDescription, initialState }) => reducerDescription)
    .toObject(({ reducerDescription, initialState }) => ({
      key: reducerDescription.subState,
      value: initialState,
    }))

  return initialState
}

export async function createPoetStore(): Promise<{
  readonly store: any
  readonly pages: any
}> {
  const pages = pageCreators.map(Page => new Page())

  const initialState = bindInitialState(pages)
  const reducerList = bindReducers(pages)

  const enhancer: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers(reducerList),
    initialState,
    enhancer(applyMiddleware(sagaMiddleware), autoRehydrate())
  )

  sagaMiddleware.run(bindSagas(pages))
  await new Promise(resolve => persistStore(store, {}, () => resolve()))

  return { store, pages }
}
