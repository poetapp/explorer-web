import * as React from 'react'
import * as moment from 'moment'
import * as classNames from 'classnames'
import { TransactionsByAddressResource, Transaction } from 'insight-client-js'

import 'extensions/Array'

import { InsightClient } from 'Insight'
import { ResourceProvider } from 'components/ResourceProvider'

const DISPLAY_TYPE: { [key: string]: string } = {
  withdrawal: 'Withdrawal from wallet',
  deposit: 'Deposit to wallet',
  earnings: 'Earnings from license sale',
  license: 'License bought'
}

interface TransactionsByAddressProps {
  readonly address: string;
  readonly licenseTransactions: ReadonlyArray<string>;
}

export class TransactionsByAddress extends ResourceProvider<TransactionsByAddressResource, TransactionsByAddressProps, undefined> {

  resourceLocator() {
    return {
      url: InsightClient.Transactions.byAddress.url(this.props.address)
    }
  }

  renderElement(transactions: TransactionsByAddressResource) {
    return transactions && transactions.txs && transactions.txs.length ? this.renderTransactions(transactions) : this.renderNoTransactions();
  }

  renderLoading() {
    return <section>Loading your transactions...</section>
  }

  private renderTransactions(transactions: TransactionsByAddressResource) {
    return (
      <table className="transactions">
        <thead>
        <tr>
          <td>Date</td>
          <td>Type</td>
          <td>Amount</td>
        </tr>
        </thead>
        <tbody>
        { transactions.txs.map(this.renderTransaction.bind(this, this.props.address, this.props.licenseTransactions)) }
        </tbody>
      </table>
    )
  }

  private renderTransaction(address: string, licenseTransactions: ReadonlyArray<string>, transaction: Transaction) {
    let type, color;

    if (transaction.vin.some(vin => vin.addr == address)) {
      type = 'withdrawal';
      color = 'negative';
      if (licenseTransactions.includes(transaction.txid)) {
        type = 'license'
      }
    } else {
      type = 'deposit';
      color = 'positive';
      if (licenseTransactions.includes(transaction.txid)) {
        type = 'earnings'
      }
    }

    const valuesIn = transaction.vin
      .map(vin => vin.value)
      .reduce((a, b) => a + b, 0);

    const valuesOutForMe = transaction.vout
      .filter(vout => vout.scriptPubKey.addresses[0] === address)
      .map(vout => vout.value)
      .map(parseFloat)
      .reduce((a, b) => a + b, 0);

    const value = type === 'deposit'
      ? valuesOutForMe
      : valuesIn - valuesOutForMe;

    return (
      <tr key={transaction.txid}>
        <td>{moment(transaction.time * 1000).format('DD-MM-YY [at] HH:mm:ss')}</td>
        <td>{DISPLAY_TYPE[type]}</td>
        <td className={classNames('amount', color)}>{ value.toFixed(8) } BTC</td>
      </tr>
    )
  }

  private renderNoTransactions() {
    return (
      <section>Your transactions will show up here.</section>
    )
  }

}