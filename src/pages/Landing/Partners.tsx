import * as React from 'react';

import './Partners.scss';

export class Partners extends React.Component<undefined, undefined> {
  render() {
    return (
      <section className="partners">
        <h1>Partners</h1>
        <ul>
          { this.placeholders().map(this.renderLogo.bind(this)) }
        </ul>
      </section>
    )
  }

  private renderLogo(logo: string, index: number) {
    return (
      <li key={index} className="partner">
        { logo }
      </li>
    )
  }

  private placeholders(): ReadonlyArray<string> {
    const placeholders = [];

    for (let i = 0; i < 4 * 6; i++) {
      placeholders.push('Logo');
    }

    return placeholders;
  }
}