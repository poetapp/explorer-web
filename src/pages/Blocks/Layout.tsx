import * as React from 'react';
import { BlockInfo } from 'poet-js';

import LatestWorks from '../../components/molecules/LatestWorks'
import { Header } from './components/Header'
import { Blocks } from './Blocks';

import './Layout.scss'

interface BlocksLayoutProps {
  readonly blocks: BlockInfo[];
}

export class BlocksLayout extends React.Component<BlocksLayoutProps, undefined> {

  render() {
    return (
      <div className="container">
        <section className="blocks">
          <Header />
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <Blocks blocks={this.props.blocks} />
            </div>
            <div className="col-sm-6 col-md-8">
              <LatestWorks limit={20} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

