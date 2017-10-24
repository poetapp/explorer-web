import * as React from 'react'
import { Api } from 'poet-js'

import { PoetAPIResourceProvider } from '../../../components/atoms/base/PoetApiResource'

interface HeaderProps {
  readonly title?: string
}

export class Header extends PoetAPIResourceProvider<Api.Node.Resource, HeaderProps> {

  poetURL() {
    return Api.Node.Path
  }

  renderElement(node: Api.Node.Resource) {
    return (
      <div className="header">
        <div className="row">
          <div className="col-sm-12">
            <h3>{ this.props.title || 'Block Explorer' }</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            Connected to <strong>https://node1.po.et/</strong>
          </div>
          <div className="col-sm-3">
            <strong>Peers:</strong> <span>{node.peers}</span>
          </div>
          <div className="col-sm-3">
            <strong>Status:</strong> <span>{node.status}</span>
          </div>
        </div>
      </div>
    )
  }

}
