import * as React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../actions/index';
import { FetchStatus } from '../enums/FetchStatus';
import { FetchStoreEntry, FetchStore } from '../store/PoetAppState';

export interface ResourceLocator {
  readonly url: string;
}

export interface ResourceProviderProps<T> {
  readonly resourceLocator: ResourceLocator;
  readonly dispatchRequest?: (payload: ResourceLocator) => void;
  readonly request?: FetchStoreEntry<T>;
  readonly provider: ResourceProvider<T, any, any>;
}

export interface ResourceProviderReduxState<T> {
  readonly fetch: FetchStore
}

class ResourceProviderBase<T> extends React.Component<ResourceProviderProps<T>, undefined> {

  componentWillMount() {
    this.dispatchRequest(this.props);
  }

  componentWillReceiveProps(newProps: ResourceProviderProps<T>) {
    this.dispatchRequest(newProps);
  }

  private dispatchRequest(props: ResourceProviderProps<T>) {
    if (!props.request || !props.request.status || this.props.resourceLocator.url !== props.resourceLocator.url) {
      props.dispatchRequest(props.resourceLocator);
    }
  }

  render() {
    if (!this.props.request || this.props.request.status == FetchStatus.Uninitialized || this.props.request.status === FetchStatus.Loading) {
      return this.props.provider.renderLoading();
    }
    if (this.props.request && this.props.request.status === FetchStatus.Error) {
      return this.props.provider.renderError(this.props.request.body);
    }
    return this.props.request
      && this.props.provider.renderElement(this.props.request.body, this.props.request.headers)
      || <span/>
  }

  componentDidUpdate(prevProps: ResourceProviderProps<T>, prevState: undefined) {
    if (this.props.request && this.props.request.status === FetchStatus.Loaded && prevProps.request && prevProps.request.status === FetchStatus.Loading)
      this.props.provider.componentDidFetch(this.props.request.body, this.props.request.headers);
  }

}

function mapStateToProps<T>(state: ResourceProviderReduxState<T>, ownProps: ResourceProviderProps<T>): ResourceProviderProps<T> {
  const url = ownProps.resourceLocator.url;
  const request = state.fetch && state.fetch[url];

  return {
    ...ownProps, request
  };

}

const mapDispatch = {
  dispatchRequest: (payload: ResourceLocator) => ({ type: Actions.fetchRequest, payload })
};

const ConnectedResourceProvider = (connect as any)(mapStateToProps, mapDispatch)(ResourceProviderBase);

interface Holder<T> {
  readonly resource?: T;
}

export abstract class ResourceProvider<Resource, PropTypes, State> extends React.Component<Holder<Resource> & PropTypes, State> {

  abstract renderElement(resource: Resource, headers: Headers): JSX.Element;

  abstract resourceLocator(): ResourceLocator;

  renderLoading() {
    return <span>Loading...</span>
  }

  renderError(error: any) {
    return <div>Error: <pre>{ JSON.stringify(error, null, 2) }</pre> </div>
  }

  render(): JSX.Element {
    return (
      <ConnectedResourceProvider resourceLocator={this.resourceLocator()} provider={this} />
    )
  }

  componentDidFetch(resource: Resource, headers: Headers) {}
}
