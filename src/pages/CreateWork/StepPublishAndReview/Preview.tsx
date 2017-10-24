import * as React from 'react';
import * as moment from 'moment';
import { Price, LicenseType, ClassNameProps } from 'poet-js'

import { Hash } from '../../../components/atoms/Hash';
import { ProfileName } from '../../../components/atoms/Profile';

import './Preview.scss';

export interface PreviewProps extends ClassNameProps {
  readonly authorName?: string;
  readonly mediaType: string;
  readonly workTitle: string;
  readonly wordCount?: string;
  readonly contentHash?: string;
  readonly price: Price;
  readonly licenseType: LicenseType;
}

export class Preview extends React.Component<PreviewProps, undefined> {

  render() {
    return (
      <section className="preview" >
        <section>
          <div>
            <h5>Title of Ownership</h5>
            <div>by <ProfileName profileId={this.props.authorName} loadingPlaceholder="..." >{this.props.authorName}</ProfileName> </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Media Type</td>
                <td>{ this.props.mediaType }</td>
              </tr>
              <tr>
                <td>Owner Name</td>
                <td><ProfileName profileId={this.props.authorName} loadingPlaceholder="..." >{this.props.authorName}</ProfileName></td>
              </tr>
              <tr>
                <td>Notarized at</td>
                <td>{moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <hr/>
        <section>
          <h5>{ this.props.workTitle } </h5>
          <table>
            <tbody>
            { this.props.wordCount &&
              <tr>
                <td>Word Count</td>
                <td>{ this.props.wordCount }</td>
              </tr>
            }
              <tr>
                <td>Category</td>
                <td>Bitcoin</td>
              </tr>
            { this.props.contentHash &&
              <tr>
                <td>Content Hash</td>
                <td><Hash className="copyable-hash">{ this.props.contentHash }</Hash></td>
              </tr>
            }
            </tbody>
          </table>
        </section>
        <hr/>
        { this.renderLicense() }
        <hr/>
        <section>
          <h5>Notary</h5>
          <table>
            <tbody>
            <tr>
              <td>Status</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>Notary</td>
              <td>Poet</td>
            </tr>
            <tr>
              <td>Estimated</td>
              <td>5 minutes</td>
            </tr>
            </tbody>
          </table>
        </section>
      </section>
    );
  }

  private renderLicense = () => {
    if (!this.props.licenseType) {
      return <section><h5>Unlicensed</h5></section>
    } else {
      return (
        <section>
          <div className="row">
            <div className="col-sm-6"><h5>{ this.props.licenseType && this.props.licenseType.name || 'No License Selected' }</h5></div>
            <div className="col-sm-6"><h5>{ this.props.price && this.props.price.amount || 0 } {this.props.price && this.props.price.currency || 'BTC'}</h5></div>
          </div>
          <p>{ this.props.licenseType.description }</p>
        </section>
      )
    }

  };

}