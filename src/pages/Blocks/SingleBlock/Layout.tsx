import * as React from 'react';
import { Link } from 'react-router';
import * as moment from 'moment';
import { Api, Claim, ClaimTypes } from 'poet-js'

import { Configuration } from '../../../configuration';
import { Header } from '../components/Header'
import { normalizeToMillis } from '../../../components/atoms/Work';
import { PoetAPIResourceProvider } from '../../../components/atoms/base/PoetApiResource'

import './Layout.scss'

interface LayoutProps {
  readonly id: string
}

export class Layout extends PoetAPIResourceProvider<Api.Blocks.Resource, LayoutProps, undefined> {

  poetURL() {
    return Api.Blocks.url(this.props.id)
  }

  renderElement(block: Api.Blocks.Resource) {
    return (
      <div className="container">
        <section className="blocks">
          <Header title={`Block #${block.id}`} />
          <div className="row">
            <div className="leftCol col-sm-6 col-md-4">
              <BlockInfo {...block} />
            </div>
            <div className="col-sm-6 col-md-8">
              <div>{block.claims.map(DisplayClaim)}</div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

const BlockInfo = (block: any) => (
  <div>
    <Item name="Timestamp date" value={moment(normalizeToMillis(block.timestamp)).format(Configuration.dateTimeFormat)} />
    <Item name="Torrent Hash" value={block.torrentHash} />
    <Item name="Height" value={block.height} />
    <Item name="Bitcoin Hash" value={block.bitcoinHash} />
    <Item name="Bitcoin Height" value={block.bitcoinHeight} />
    <Item name="Number of Claims" value={block.claims.length} />
  </div>
)

const Item = (props: { name: string, value: string }) => (
  <div>
    <div className="title">{props.name}</div>
    <pre>{props.value}</pre>
  </div>
)

const DisplayClaim = (claim: Claim) => (
  <div key={claim.id} className="item">
    <div className="title">{displayType(claim.type)}</div>
    <div>Technical information: <Link to={makeLink(claim)}>{claim.id}</Link></div>
    <div>{displayDescription(claim)}</div>
  </div>
)

const displayType = (type: ClaimTypes.ClaimOrJudgement) => {
  switch (type) {
    case ClaimTypes.WORK: return 'Creative Work';
    case ClaimTypes.LICENSE: return 'License';
    case ClaimTypes.OFFERING: return 'License Offering';
    case ClaimTypes.PROFILE: return 'Profile';
    case ClaimTypes.TITLE: return 'Title of Ownership';
    case ClaimTypes.CERTIFICATE: return 'Certificate';
    case ClaimTypes.REVOCATION: return 'Revokation';
    default: return 'Unknown kind: ' + type;
  }
}

const displayDescription = (claim: Claim) => {
  switch (claim.type) {
    case ClaimTypes.WORK: return 'Title: ' + claim.attributes.name || 'Untitled ' + claim.id;
    case ClaimTypes.PROFILE: return claim.attributes.displayName || 'Unnamed ' + claim.publicKey;
    case ClaimTypes.TITLE: return 'For ' + claim.attributes.reference || 'Unreferenced';
    case ClaimTypes.OFFERING: return 'Reference to ' + claim.attributes.reference || 'Unreferenced';
    case ClaimTypes.CERTIFICATE: return claim.attributes.reference || 'Unknown reference';
    default: return claim.attributes.for ? 'for ' + claim.attributes.for : claim.id;
  }
}

const makeLink = (claim: Claim) => {
  switch (claim.type) {
    default: return `/claims/${claim.id}`
  }
}