import * as React from 'react';
import { Link } from 'react-router';
import { Api, Work, ClassNameProps } from 'poet-js';

import '../../extensions/String';

import { PoetAPIResourceProvider } from '../atoms/base/PoetApiResource'
import { WorkNameWithLink, WorkStampedDate } from '../atoms/Work';

import './LatestWorks.scss';

type LatestWorksResource = ReadonlyArray<Api.Works.Resource>;

export interface LatestWorksProps extends ClassNameProps {
  readonly limit?: number;
  readonly showLink?: boolean;
}

export default class LatestBlocks extends PoetAPIResourceProvider<LatestWorksResource, LatestWorksProps, undefined> {
  static defaultProps: LatestWorksProps = {
    limit: 5
  };

  poetURL() {
    return Api.Works.url({
      limit: this.props.limit
    })
  }

  renderElement(works: LatestWorksResource) {
    return (
      <table className="latest-works">
        <thead>
          <tr>
            <td className="title" colSpan={2}>
              Latest Works
            </td>
            <td className="view-latest">
              { this.props.showLink && <Link to="/blocks">View Latest</Link> }
            </td>
          </tr>
        </thead>
        <tbody>
          { works.map(this.renderWork) }
        </tbody>
      </table>
    );
  }

  private renderWork = (props: Work) => {
    return (
      <tr key={props.id}>
        <td className="work-name">
          <WorkNameWithLink work={props} />
        </td>
        <td className="id">
          {props.id && props.id.firstAndLastCharacters(6)}
        </td>
        <td className="date">
          <WorkStampedDate work={props}/>
        </td>
      </tr>
    )
  }

}