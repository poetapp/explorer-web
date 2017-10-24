import * as React from 'react'
import { Price, LicenseType } from 'poet-js';

import { TermsOfUse } from './TermsOfUse'
import { Preview } from './Preview'

import './StepPublishAndReview.scss';

export interface StepPublishAndReviewProps {
  readonly onSubmit: () => void;
  readonly authorName?: string;
  readonly workTitle: string;
  readonly contentHash?: string;
  readonly wordCount?: string;
  readonly price: Price;
  readonly licenseType: LicenseType;
}

export interface StepPublishAndReviewState {
  readonly acceptedTos: boolean;
}

export default class StepPublishAndReview extends React.Component<StepPublishAndReviewProps, StepPublishAndReviewState> {

  constructor() {
    super(...arguments);
    this.state = {
      acceptedTos: false
    };
  }

  render() {
    return (
      <section className="step-3-publish">
        <div className="row">
          <div className="col-sm-7 terms-of-use">
            <TermsOfUse onChange={this.setAcceptedTos} />
            <button
              disabled={!this.state.acceptedTos}
              onClick={this.props.onSubmit}
              className="button-primary submit">
              Timestamp to the blockchain
            </button>
          </div>
          <div className="col-sm-5">
            <Preview
              authorName={this.props.authorName}
              workTitle={this.props.workTitle}
              contentHash={this.props.contentHash}
              wordCount={this.props.wordCount}
              mediaType="Article"
              price={this.props.price}
              licenseType={this.props.licenseType}
            />
          </div>
        </div>
      </section>
    )
  }

  private setAcceptedTos = (value: boolean) => {
    this.setState({ acceptedTos: value })
  }
}

