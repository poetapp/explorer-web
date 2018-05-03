import { connect, StatelessComponent, ComponentClass } from 'react-redux'
import { Reducer } from 'redux'

export interface ReducerDescription<T> {
  subState: string
  reducer: Reducer<T>
}

abstract class PageLoader<State, Properties> {
  abstract readonly component:
    | ComponentClass<Properties>
    | StatelessComponent<Properties>

  abstract initialState(): State
  abstract routeHook(key: string): JSX.Element[]
  abstract reducerHook<State>(): ReducerDescription<State>
  abstract sagaHook(): any
  abstract select(state: any, ownProps: any): Properties
  mapDispatchToProps(): any {
    return {}
  }

  protected container() {
    return connect(this.select.bind(this), this.mapDispatchToProps())(
      this.component
    )
  }
}

export default PageLoader
