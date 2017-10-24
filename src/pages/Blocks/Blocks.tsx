import * as React from 'react';
import { Link } from 'react-router';
import * as moment from 'moment';
import * as classNames from 'classnames'
import { BlockInfo, ClassNameProps } from 'poet-js';

import './Blocks.scss';

interface BlocksProps extends ClassNameProps {
  readonly blocks: BlockInfo[];
}

export function Blocks(props: BlocksProps) {
  return (
    <div className={classNames('blocks', props.className)}>
      <div className="headHeight">
        <div className="number">
          {props.blocks[0] && props.blocks[0].height}
        </div>
        <div className="desc">
          block height
        </div>
      </div>
      <table className="table">
        <tbody>
        { props.blocks.map(renderBlock) }
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: BlockInfo) {
  const idField = block.hash
    ? <BlockLink hash={block.hash} />
    : block.torrentHash.firstAndLastCharacters(4);
  return (
    <tr key={block.torrentHash}>
      <td># {block.height}</td>
      <td>{ idField }</td>
      <td>{moment(block.timestamp*1000).fromNow()}</td>
      <td>{block.bitcoinHeight}</td>
    </tr>
  )
}

interface BlockLinkProps {
  readonly hash: string;
}

function BlockLink(props: BlockLinkProps) {
  return (
    <Link to={`/blocks/${props.hash}`}>
      {props.hash.firstAndLastCharacters(4)}
    </Link>
  );
}