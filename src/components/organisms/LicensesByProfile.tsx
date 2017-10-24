import * as React from 'react';
import { Link } from 'react-router';
import * as classNames from 'classnames';
import { Api, Headers } from 'poet-js';

import '../../extensions/String';

import { Images } from '../../images/Images';
import { Configuration } from '../../configuration';
import { OwnerName } from '../atoms/Work';
import { TimeSinceIssueDate, ReferencedWorkName } from '../atoms/License';
import { OfferingType } from '../atoms/Offering';
import { PoetAPIResourceProvider } from '../atoms/base/PoetApiResource';
import { DropdownMenu } from '../DropdownMenu';
import { Pagination } from '../molecules/Pagination';

import './LicensesByProfile.scss';

export type LicensesResource = ReadonlyArray<Api.Licenses.Resource>;

export type LicenseToProfileRelationship = 'relatedTo' | 'emitter' | 'holder';

export interface LicensesProps {
  readonly publicKey?: string;
  readonly limit?: number;
  readonly showActions?: boolean;
  readonly searchQuery?: string;
  readonly relationship: LicenseToProfileRelationship
}

interface LicensesState {
  readonly offset?: number;
}

export class LicensesByProfile extends PoetAPIResourceProvider<LicensesResource, LicensesProps, LicensesState> {
  private lastFetchedLicenses: LicensesResource;
  private lastFetchedCount: number;

  static defaultProps: Partial<LicensesProps> = {
    showActions: false,
    searchQuery: '',
    relationship: 'relatedTo',
    limit: Configuration.pagination.limit
  };

  constructor() {
    super(...arguments);
    this.state = {
      offset: 0
    }
  }

  poetURL() {
    return Api.Licenses.url({
      limit: this.props.limit,
      offset: this.state.offset,
      [this.props.relationship]: this.props.publicKey,
      query: this.props.searchQuery
    })
  }

  renderElement(licenses: LicensesResource, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    return (licenses && licenses.length) ? this.renderLicenses(licenses, count) : this.renderNoLicenses();
  }

  renderLoading() {
    return this.renderLicenses(this.lastFetchedLicenses, this.lastFetchedCount, true);
  }

  componentDidFetch(licenses: LicensesResource, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    this.lastFetchedLicenses = licenses;
    this.lastFetchedCount = count;
  }

  private renderLicenses(licenses: LicensesResource, count: number, isLoading?: boolean) {
    return (
      <section className={classNames('licenses-by-profile', isLoading && 'loading', !licenses && 'no-content')}>
        {
          isLoading && !licenses
            ? <img src={Images.Quill} />
            : <ul className="licenses">{ licenses.map(this.renderLicense, this) }</ul>
        }
        <Pagination
          offset={this.state.offset}
          limit={this.props.limit}
          count={count}
          visiblePageCount={Configuration.pagination.visiblePageCount}
          onClick={offset => this.setState({offset})}
          className="pagination"
          disabledClassName="disabled"/>
      </section>
    )
  }

  private renderNoLicenses() {
    return (
      <section className="licenses">
        <div>{ this.props.children || (!this.props.searchQuery ? 'No licenses to show' : 'No licenses match the given criteria') }</div>
      </section>
    )
  }

  private renderLicense(license: Api.Licenses.Resource) {
    return (
      <li key={license.id}>
        <header>
          <h2><Link to={"/l/" + license.id}><ReferencedWorkName license={license} /></Link></h2>
          { this.props.showActions && this.renderLicenseDropdownMenu(license) }
        </header>
        <main>
          <div>Offering Type: <OfferingType offering={license.referenceOffering} /></div>
          <div><TimeSinceIssueDate license={license} /></div>
          <div>Owned by: <OwnerName workId={ license.reference.id }/></div>
        </main>
      </li>
    )
  }

  private renderLicenseDropdownMenu(license: Api.Licenses.Resource) {
    return (
      <div className="menu">
        <DropdownMenu options={['Revoke']} onOptionSelected={this.optionSelected.bind(this, license)}>
          Actions
        </DropdownMenu>
      </div>
    );
  }

  private optionSelected(license: any, option: string) {
    console.log('optionSelected', license, option);
  }

}