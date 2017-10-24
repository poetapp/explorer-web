import * as React from 'react';
import { Link } from 'react-router';
import * as moment from 'moment';
import { Api, ClassNameProps } from 'poet-js';

import '../../extensions/String';

import { PoetAPIResourceProvider } from '../atoms/base/PoetApiResource'

import './LatestBlocks.scss';

interface Block {
  readonly torrentHash: string;
  readonly height: string;
  readonly id: string;
  readonly timestamp: number;
}

type LatestBlocksResource = ReadonlyArray<Block>;

export interface LatestBlocksProps extends ClassNameProps {
  readonly limit?: number;
}

export class LatestBlocks extends PoetAPIResourceProvider<LatestBlocksResource, LatestBlocksProps, undefined> {
  static defaultProps: LatestBlocksProps = {
    limit: 5
  };

  poetURL() {
    return Api.Blocks.url({
      limit: this.props.limit
    })
  }

  renderElement(blocks: LatestBlocksResource) {
    return (
      <table className={`latest-blocks ${this.props.className}`}>
        <thead>
          <tr>
            <td className="title" colSpan={2}>Poet Blockchain</td>
            <td className="view-all"><Link to="/blocks">View All</Link></td>
          </tr>
        </thead>
        <tbody>
          { blocks.map(this.renderBlock.bind(this)) }
        </tbody>
      </table>
    );
  }

  private renderBlock(props: Block) {
    return (
      <tr key={props.torrentHash}>
        <td className="height">{props.height || 'Unconfirmed'}</td>
        <td className="id">
          { props.id ? <Link to={`/blocks/${props.id}`}>{props.id.firstAndLastCharacters(6)}</Link> : 'not ready' }
        </td>
        <td className="date">{props.timestamp ? moment(props.timestamp * 1000).fromNow() : '(pending)'}</td>
      </tr>
    )
  }

}