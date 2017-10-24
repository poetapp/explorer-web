import * as React from 'react';

import { Images } from '../../images/Images';

import './Reviews.scss';

class Review {
  readonly authorName: string;
  readonly authorTagline: string;
  readonly authorAvatar: string;
  readonly content: string;

  constructor(authorName: string, authorTagline: string, authorAvatar: string, content: string) {
    this.authorName = authorName;
    this.authorTagline = authorTagline;
    this.authorAvatar = authorAvatar;
    this.content = content;
  }
}

export class Reviews extends React.Component<undefined, undefined> {
  readonly reviewLoremIpsum = 'Lorem - this is a quote about the project and how it is going to change the way that we publish articles  in the future, but it doesn’t stop with articles, it goes much more beyond that.';
  readonly reviews: ReadonlyArray<Review> = [
    new Review('Satoshi Nakamoto', 'Bitcoin Creator', Images.Anon, this.reviewLoremIpsum),
    new Review('Satoshi Nakamoto', 'Bitcoin Creator', Images.Anon, this.reviewLoremIpsum),
    new Review('Satoshi Nakamoto', 'Bitcoin Creator', Images.Anon, this.reviewLoremIpsum)
  ];
  render() {
    return (
      <section className="reviews">
        <h1>What are people saying about it</h1>
        <h2>Here''s a list of things people have to say about it </h2>
        <div className="row">
          { this.reviews.map(this.renderReview.bind(this)) }
        </div>
      </section>
    )
  }

  private renderReview(review: Review, index: number) {
    return (
      <div key={index} className="col-sm-4 review">
        <div>
          <img src={review.authorAvatar} />
        </div>
        <h1>{ review.authorName }</h1>
        <h2>{ review.authorTagline }</h2>
        <article>"{ review.content }"</article>
      </div>
    )
  }
}