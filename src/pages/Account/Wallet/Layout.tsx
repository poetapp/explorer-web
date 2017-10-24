import * as React from 'react';

import './Layout.scss';

import { Transactions } from './Transactions';
import { WalletOperations } from './WalletOperations';

interface WalletLayoutProps {
  publicKey?: string;
  address?: string;
  requestWithdrawal?: any;
}

export class WalletLayout extends React.Component<WalletLayoutProps, undefined> {

  render() {
    return (
      <section className="container page-account-wallet">
        <h1>Wallet</h1>
        <main className="row">
          <div className="col-md-4">
            <WalletOperations address={this.props.address} requestWithdrawal={this.props.requestWithdrawal} />
          </div>
          <div className="col-md-8">
            <Transactions profileId={this.props.publicKey}/>
          </div>
        </main>
      </section>
    )
  }

  componentDidMount() {
    document.title = 'Wallet'
  }

  componentWillUnmount() {
    document.title = 'Poet'
  }
}


