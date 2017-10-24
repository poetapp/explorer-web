import * as React from 'react';
import { Link } from 'react-router';
import { Api, Headers } from 'poet-js'

import { SearchInput } from '../../components/atoms/SearchInput';
import { PoetAPIResourceProvider } from '../../components/atoms/base/PoetApiResource';
import { ProfileNameWithLink } from '../../components/atoms/Profile';
import { SelectProfileById } from '../../components/atoms/Arguments';
import {
  LicensesByProfile, LicensesResource,
  LicenseToProfileRelationship
} from '../../components/organisms/LicensesByProfile'
import { LicensesFilters } from './LicensesFilters';

interface LicensesProps extends SelectProfileById {
  readonly authenticatedUserIsOwner: boolean;
}

interface LicensesState {
  readonly selectedFilter?: string;
  readonly searchQuery?: string;
}

export class Licenses extends PoetAPIResourceProvider<LicensesResource, LicensesProps, LicensesState> {
  private didLoading: boolean;

  constructor() {
    super(...arguments);
    this.state = {
      selectedFilter: LicensesFilters.ALL,
      searchQuery: ''
    }
  }

  poetURL() {
    return Api.Licenses.url({
      limit: 1,
      relatedTo: this.props.profileId
    })
  }

  renderElement(licenses: LicensesResource, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    return count ? this.renderLicenses() : this.renderNoLicenses();
  }

  renderLoading() {
    this.didLoading = true;
    return <section className="licenses loading"></section>;
  }

  private renderLicenses() {
    return (
      <section className="licenses">
        <nav className={this.didLoading && 'fade-in'}>
          <SearchInput
            className="search"
            value={this.state.searchQuery}
            onChange={searchQuery => this.setState({searchQuery})}
            placeholder="Search Licenses" />
          <LicensesFilters
            selectedId={this.state.selectedFilter}
            onOptionSelected={selectedFilter => this.setState({selectedFilter})}
            className="filters" />
        </nav>
        <LicensesByProfile
          publicKey={this.props.profileId}
          relationship={this.selectedFilterRelationship()}
          searchQuery={this.state.searchQuery}>
          <div className="no-results">
            <ProfileNameWithLink profileId={this.props.profileId} >This user&nbsp;</ProfileNameWithLink> doesn't own any licenses yet.
          </div>
        </LicensesByProfile>
      </section>
    )
  }

  private renderNoLicenses() {
    return (
      <section className="licenses no-items">
        <div className="circle"></div>
        <div className="message">
          { this.props.authenticatedUserIsOwner && <div>
            <h1>You have no licenses yet</h1>
            <small>
              <Link to="/works">Browse published works</Link> to buy some or <Link to="/create-work">register a new work</Link> of your own to start selling licenses.
            </small>
          </div> }
          { !this.props.authenticatedUserIsOwner && <div>
            <h1><ProfileNameWithLink profileId={this.props.profileId} >This user&nbsp;</ProfileNameWithLink> doesn't own any licenses yet.</h1>
          </div> }
        </div>
      </section>
    )
  }

  private selectedFilterRelationship(): LicenseToProfileRelationship {
    switch (this.state.selectedFilter) {
      case LicensesFilters.ALL:
        return 'relatedTo';
      case LicensesFilters.SOLD:
        return 'emitter';
      case LicensesFilters.PURCHASED:
        return 'holder';
    }
  }
}
