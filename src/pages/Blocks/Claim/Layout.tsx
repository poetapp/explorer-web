import * as React from 'react'
import { Api } from 'poet-js'

import { PoetAPIResourceProvider } from '../../../components/atoms/base/PoetApiResource'

import './Layout.scss'

interface LayoutProps {
  readonly id: string
}

export class Layout extends PoetAPIResourceProvider<Api.Claims.Resource, LayoutProps> {

  poetURL() {
    return Api.Claims.url(this.props.id)
  }

  renderElement(claim: Api.Claims.Resource) {
    return (
      <div className="container">
        <h3>Block Explorer - View Claim</h3>
        <h4><pre>{claim.id}</pre></h4>
        <section className="singleClaim">
          <DisplayClaim {...claim} />
        </section>
      </div>
    )
  }

}

const DisplayClaim = (claim: Api.Claims.Resource) => (
  <div key={claim.id} className="contents">
    <div className="monospaced">
      <div className="title">Public Key</div>
      <pre>{claim.publicKey}</pre>
    </div>
    <div className="monospaced">
      <div className="title">Signature</div>
      <pre>{claim.signature}</pre>
    </div>
    <div className="monospaced">
      <div className="title">Contents</div>
      <pre>{JSON.stringify(claim.attributes, null, 2)}</pre>
    </div>
  </div>
)