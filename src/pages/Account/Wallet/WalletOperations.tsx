import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { WalletBalance } from '../../../components/atoms/WalletBalance';
import { WalletOperationDeposit } from './WalletOperationDeposit';
import { WalletOperationWithdraw } from './WalletOperationWithdraw';

import './WalletOperations.scss';

interface WalletOperationsProps {
  readonly address?: string;
  readonly balance?: number;
  readonly requestWithdrawal?: any;
}

export class WalletOperations extends React.Component<WalletOperationsProps, undefined> {
  render() {
    return (
      <section className="wallet-operations">
        <WalletBalance address={this.props.address} className="balance" dual />
        <Tabs selectedIndex={0} className="wallet-tabs" >
          <TabList className="wallet-tab-list" activeTabClassName="selected">
            <Tab>Deposit</Tab>
            <Tab>Withdraw</Tab>
          </TabList>
          <TabPanel>
            <WalletOperationDeposit address={this.props.address} />
          </TabPanel>
          <TabPanel>
            <WalletOperationWithdraw address={this.props.address} requestWithdrawal={this.props.requestWithdrawal} balance={this.props.balance}/>
          </TabPanel>
        </Tabs>
      </section>
    )
  }
}