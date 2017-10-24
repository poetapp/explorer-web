import * as React from 'react';
import { Link } from 'react-router';
import { Api, Headers } from 'poet-js';

import { Images } from '../../images/Images';
import { DispatchesTransferRequested } from '../../actions/requests';
import { PoetAPIResourceProvider } from '../../components/atoms/base/PoetApiResource';
import { SelectProfileById } from '../../components/atoms/Arguments';
import { SearchInput } from '../../components/atoms/SearchInput';
import { ProfileNameWithLink } from '../../components/atoms/Profile';
import { WorksByProfile, WorkToProfileRelationship } from '../../components/organisms/WorksByProfile';
import { PortfolioWorksFilters } from './PortfolioFilters';

interface WorksTabProps extends SelectProfileById, DispatchesTransferRequested {
  readonly authenticatedUserIsOwner?: boolean;
}

interface WorksTabState {
  readonly selectedFilter?: string;
  readonly searchQuery?: string;
  readonly profileId?: string;
}

export class WorksTab extends PoetAPIResourceProvider<ReadonlyArray<Api.Works.Resource>, WorksTabProps, WorksTabState> {
  private didLoading: boolean;

  constructor() {
    super(...arguments);
    this.state = {
      selectedFilter: PortfolioWorksFilters.ALL
    }
  }

  poetURL() {
    return Api.Works.url({
      relatedTo: this.props.profileId,
      limit: 1,
    })
  }

  renderElement(works: ReadonlyArray<Api.Works.Resource>, headers: Headers) {
    const count = headers.get(Headers.TotalCount) && parseInt(headers.get(Headers.TotalCount));
    return count ? this.renderWorks() : this.renderNoWorks();
  }

  renderLoading() {
    this.didLoading = true;
    return <section className="works loading"></section>;
  }

  private renderWorks() {
    return (
      <section className="works">
        <nav className={this.didLoading && 'fade-in'}>
          <SearchInput
            className="search"
            value={this.state.searchQuery}
            onChange={searchQuery => this.setState({searchQuery})}
            placeholder="Search Works" />
          <PortfolioWorksFilters
            selectedId={this.state.selectedFilter}
            onOptionSelected={selectedFilter => this.setState({selectedFilter})}
            className="filters"/>
        </nav>
        <WorksByProfile
          owner={this.props.profileId}
          transferRequested={this.props.transferRequested}
          relationship={this.selectedFilterRelationship()}
          searchQuery={this.state.searchQuery}
          showActions={this.props.authenticatedUserIsOwner}>
          <div className="no-results">
            <ProfileNameWithLink profileId={this.props.profileId}>This user&nbsp;</ProfileNameWithLink> hasn't registered any works yet.
          </div>
        </WorksByProfile>
      </section>
    )
  }

  private renderNoWorks() {
    return (
      <section className="works no-items">
        <div className="circle"></div>
        <div className="message">
          { this.props.authenticatedUserIsOwner && <h1>You haven’t registered any creative works yet</h1> }
          { this.props.authenticatedUserIsOwner && <small>This takes you through the process of registereing a new work. If you would like to automate this process please view our integrations.</small> }
          { !this.props.authenticatedUserIsOwner && <h1><ProfileNameWithLink profileId={this.props.profileId}>This user&nbsp;</ProfileNameWithLink> hasn't registered any creative works yet.</h1> }
          { !this.props.authenticatedUserIsOwner && <small>Bummer.</small> }
        </div>
        { this.props.authenticatedUserIsOwner && <Link to="/create-work" className="button-primary"><img src={Images.QuillInverted} />Register New Work</Link> }
      </section>
    )
  }

  private selectedFilterRelationship(): WorkToProfileRelationship {
    switch (this.state.selectedFilter) {
      case PortfolioWorksFilters.ALL:
        return 'relatedTo';
      case PortfolioWorksFilters.LICENSED_TO_ME:
        return 'licensedTo';
      case PortfolioWorksFilters.OWNED:
        return 'owner';
      case PortfolioWorksFilters.AUTHORED:
        return 'author';
    }
  }

}
