import * as React from 'react';
import * as classNames from 'classnames';
import { Api, ClaimTypes, Work, WorkOffering } from 'poet-js'

import { PoetAPIResourceProvider } from '../../components/atoms/base/PoetApiResource';

import './WorkOfferings.scss';

interface WorkOfferingsProps {
  readonly workId: string;
  readonly onPurchaseRequest: (work: Work, workOffering: WorkOffering) => void;
}

export class WorkOfferings extends PoetAPIResourceProvider<Api.Works.Resource, WorkOfferingsProps, undefined> {

  poetURL() {
    return Api.Works.url(this.props.workId)
  }

  renderElement(work: Api.Works.Resource) {
    if (!work || !work.offerings || !work.offerings.length)
      return null;

    return this.renderOfferings(work);
  }

  renderLoading() {
    return this.renderOfferings({
      id: '',
      publicKey: '',
      signature: '',
      attributes: {
        name: 'Work',
        datePublished: Date.now().toString(),
        dateCreated: Date.now().toString(),
        dateModified: Date.now().toString(),
        mediaType: '',
        articleType: '',
        author: '',
        lastModified: '',
        contentHash: '',
        tags: '',
        type: ''
      },
      offerings: [{
        id: 'id',
        type: ClaimTypes.OFFERING,
        owner: '',
        publicKey: '',
        signature: '',
        attributes: {
          licenseType: '...',
          licenseDescription: '...',
          pricingFrequency: '...',
          pricingPriceAmount: '0',
          pricingPriceCurrency: '...',
        },
        licenses: null
      }] as ReadonlyArray<WorkOffering>
    } as any, true);
  }

  private renderOfferings(work: Api.Works.Resource, isLoading?: boolean) {
    return (
      <section className={classNames('offerings', isLoading && 'loading')}>
        { work.offerings.map(this.renderOffering.bind(this, work)) }
      </section>
    )
  }

  private renderOffering(work: Api.Works.Resource, workOffering: WorkOffering) {
    return (
      <section className="offering" key={workOffering.id} >
        <h3>License</h3>
        <main>
          <div className="info row">
            <div className="description col-xs-7">
              { workOffering.attributes.licenseDescription || 'This offering lacks a description. Please contact the author.' }
            </div>
            <div className="col-xs-5">
              <div className="price">
                { workOffering.attributes.pricingPriceAmount || 0 }&nbsp;
                { workOffering.attributes.pricingPriceCurrency || 'BTC' }
              </div>
              <div className="type">
                { workOffering.attributes.licenseType }
              </div>
            </div>
          </div>
          <button className="button-secondary" onClick={() => this.props.onPurchaseRequest(work, workOffering)}>Purchase License</button>
        </main>
      </section>
    );
  }

}