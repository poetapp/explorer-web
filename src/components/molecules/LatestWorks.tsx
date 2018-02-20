import * as React from 'react'
import { Link } from 'react-router'

import 'extensions/String'

import { Api } from 'helpers/PoetApi'
import { ClassNameProps } from 'components/ClassNameProps'
import { PoetAPIResourceProvider } from 'components/atoms/base/PoetApiResource'
import { WorkNameWithLink } from 'components/atoms/Work'
import { TimeElapsedSinceCreation } from 'components/atoms/Claim'

import './LatestWorks.scss'

type LatestWorksResource = ReadonlyArray<Api.WorkById.Response>

export interface LatestWorksProps extends ClassNameProps {
  readonly limit?: number;
  readonly showLink?: boolean;
}

export default class LatestBlocks extends PoetAPIResourceProvider<LatestWorksResource, LatestWorksProps, undefined> {
  static defaultProps: LatestWorksProps = {
    limit: 5
  };

  poetURL() {
    return Api.WorksByFilters.url({
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

  private renderWork = (props: Api.WorkById.Response) => {
    return (
      <tr key={props.id}>
        <td className="work-name">
          <WorkNameWithLink work={props} />
        </td>
        <td className="id">
          {props.id && props.id.firstAndLastCharacters(6)}
        </td>
        <td className="date">
          <TimeElapsedSinceCreation claim={props}/>
        </td>
      </tr>
    )
  }

}