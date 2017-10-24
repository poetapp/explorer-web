import * as React from 'react';
import { Route } from 'react-router';

import { SingleLicense as Layout } from './Layout';
import SimpleLoader from '../../../components/SimpleLoader';

export class SingleLicense extends SimpleLoader {
  component = Layout;

  routeHook(key: string) {
    return [<Route path="/l/:id" key={key} component={this.container()} />]
  }

  select(state: any, ownProps: any): Object {
    return {
      licenseId: ownProps.routeParams.id
    }
  }
}
