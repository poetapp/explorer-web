import * as React from 'react';
import { Work } from 'poet-js';

import '../../extensions/String';

import { Images } from '../../images/Images';
import { ProfileNameWithLink, ProfilePictureById } from '../../components/atoms/Profile';
import { WorkById } from '../../components/atoms/Work';

import './Title.scss';

export class Title extends WorkById {

  renderElement(work: Work) {
    const owner = work.title && work.title.attributes && work.title.attributes.owner;
    return (
      <section className="title">
        <h3>Owner</h3>
        <main className="wrapper">
          <ProfilePictureById profileId={owner} className="profile-picture" />
          <ProfileNameWithLink profileId={owner} >{work.owner.displayName}</ProfileNameWithLink>
        </main>
      </section>
    )
  }

  renderLoading() {
    return (
      <section className="title loading">
        <h3>Owner</h3>
        <main className="wrapper">
          <img src={Images.Anon} className="profile-picture"/>
          <a href="#">Owner</a>
        </main>
      </section>
    )
  }

}