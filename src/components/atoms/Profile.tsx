import * as React from 'react';
import { Link } from 'react-router';
import * as moment from 'moment';
import { Api, License, ClassNameProps } from 'poet-js';

import { Configuration } from '../../configuration';
import { Images } from '../../images/Images';
import { PoetAPIResourceProvider } from './base/PoetApiResource';
import { SelectProfileById } from './Arguments';

export abstract class ProfileById<Props> extends PoetAPIResourceProvider<Api.Profiles.Resource, SelectProfileById & Props, undefined> {

  poetURL() {
    return Api.Profiles.url(this.props.profileId)
  }

}

interface ProfileNameProps {
  readonly loadingPlaceholder?: string;
}

export class ProfileName extends ProfileById<ProfileNameProps> {

  renderElement(profile: Api.Profiles.Resource) {
    return profile
      ? <span>{ profile.displayName || 'Anonymous' }</span>
      : this.renderError(null);
  }

  renderLoading() {
    return this.renderLoadingPlaceholder() || this.renderChildren() || super.renderLoading();
  }

  renderError(error: any) {
    return this.renderChildren() || super.renderError(error);
  }

  private renderChildren() {
    return this.props.children && <span>{this.props.children}</span>;
  }

  private renderLoadingPlaceholder() {
    return this.props.loadingPlaceholder && <span>{this.props.loadingPlaceholder}</span>;
  }
}

export class ProfileNameWithLink extends ProfileById<ClassNameProps> {

  renderElement(profile: Api.Profiles.Resource) {
    return profile
      ? <Link to={"/profiles/" + profile.id} className={this.props.className}>{ profile.displayName || 'Anonymous' }</Link>
      : this.renderError(null);
  }

  renderLoading() {
    return this.renderChildren() || super.renderLoading();
  }

  renderError(error: any) {
    return this.renderChildren() || super.renderError(error);
  }

  renderChildren() {
    return this.props.children && <span>{this.props.children}</span>;
  }

}

export class ProfileBio extends ProfileById<undefined> {

  renderElement(profile: Api.Profiles.Resource) {
    return <div>{profile.attributes.bio}</div>
  }

  renderLoading() {
    return this.renderChildren() || super.renderLoading();
  }

  renderError(error: any) {
    return this.renderChildren() || super.renderError(error);
  }

  renderChildren() {
    return this.props.children && <span>{this.props.children}</span>;
  }

}

export function LicenseOwnerNameWithLink(props: { license: License }) {
  return <ProfileNameWithLink profileId={props.license.licenseHolder.id} />
}

export function LicenseEmitterNameWithLink(props: { license: License }) {
  return <ProfileNameWithLink profileId={props.license.referenceOffering.owner} />
}

export function LicenseEmittedDate(props: { license: License }) {
  const publishDate = props.license
    && props.license.claimInfo
    && props.license.claimInfo.timestamp
  return (<span>{
    publishDate
      ? moment(publishDate * 1000).format(Configuration.dateTimeFormat)
      : '(pending timestamp on the blockchain)'
  }</span>)
}

export class ProfilePictureById extends ProfileById<ClassNameProps> {

  renderElement(resource: Api.Profiles.Resource): JSX.Element {
    if (!resource.attributes || !resource.attributes.imageData) {
      return <img src={Images.Anon} />
    }
    return <img src={resource.attributes.imageData}/>
  }

  renderLoading() {
    return this.renderChildren() || <img src={Images.Anon}/>;
  }

  renderError(error: any) {
    return this.renderChildren() || <img src={Images.Anon}/>;
  }

  renderChildren() {
    return this.props.children && <span>{this.props.children}</span>;
  }

}