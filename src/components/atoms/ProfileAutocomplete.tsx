import * as React from 'react';
import * as classNames from 'classnames';
const Autocomplete = require('react-autocomplete');
import { ClassNameProps, Api } from 'poet-js';

import { PoetAPIResourceProvider } from './base/PoetApiResource';

interface ProfileAutocompleteProps extends ClassNameProps {
  readonly value: string;
  readonly onSelect: (profile: string) => void;
  readonly onChange: (profile: string) => void;
  readonly placeholder?: string;
}

interface ProfileAutocompleteState {
  readonly menuIsOpen?: boolean;
}

export class ProfileAutocomplete extends PoetAPIResourceProvider<ReadonlyArray<Api.ProfileAutocomplete.Resource>, ProfileAutocompleteProps, ProfileAutocompleteState> {
  private lastFetchedProfiles: ReadonlyArray<Api.ProfileAutocomplete.Resource> = [];

  constructor() {
    super(...arguments);
    this.state = {
      menuIsOpen: false
    }
  }

  poetURL() {
    return Api.ProfileAutocomplete.url(this.props.value)
  }

  renderElement(profiles: ReadonlyArray<Api.ProfileAutocomplete.Resource>) {
    return (
      <Autocomplete
        wrapperProps={{className: 'autocomplete'}}
        items={profiles || []}
        value={this.getDisplayValue(profiles)}
        onSelect={(value: string, item: Api.ProfileAutocomplete.Resource) => this.props.onSelect(value)}
        onChange={(event: any, value: string) => this.onChange(profiles, value)}
        getItemValue={(profile: Api.ProfileAutocomplete.Resource) => profile.id}
        renderMenu={this.renderMenu}
        renderItem={this.renderProfile}
        inputProps={{className: classNames('input-text', this.state.menuIsOpen && 'open', this.props.className), placeholder: this.props.placeholder}}
        onMenuVisibilityChange={(menuIsOpen: boolean) => this.setState({menuIsOpen})} />
    );
  }

  renderLoading() {
    return this.renderElement(this.lastFetchedProfiles || []);
  }

  renderError() {
    return this.renderElement([]);
  }

  componentDidFetch(profiles: ReadonlyArray<Api.ProfileAutocomplete.Resource>) {
    this.lastFetchedProfiles = profiles;
  }

  private getDisplayValue(profiles?: ReadonlyArray<Api.ProfileAutocomplete.Resource>) {
    const allProfiles = [...(profiles || []), ...(this.lastFetchedProfiles || [])];
    const profile = allProfiles.find(_ => _.id === this.props.value);
    return profile ? profile.displayName : this.props.value;
  }

  private onChange = (profiles: ReadonlyArray<Api.ProfileAutocomplete.Resource>, value: string) => {
    const profile = profiles && profiles.find(_ => _.displayName === value);
    this.props.onChange(profile ? profile.id : value);
  };

  private renderMenu = (children: React.ReactChildren) => <ul className="menu">{children}</ul>;

  private renderProfile = (profile: Api.ProfileAutocomplete.Resource, highlight: boolean) => {
    const displayValue = this.getDisplayValue();

    const splits = profile.displayName.split(new RegExp(`(${displayValue})`, 'i'));
    const matchedItem = splits.map((s, i) => <span key={i} className={classNames(this.shouldItemRender(s, displayValue) && 'matched')}>{s}</span>);

    return (
      <li
        key={profile.id}
        id={profile.id}
        className={highlight ? 'blur' : ''}
      >{matchedItem}</li>
    )
  };

  private shouldItemRender = (item: string, value: string) => {
    return value && item.toLowerCase().includes(value.toLowerCase());
  }

}
