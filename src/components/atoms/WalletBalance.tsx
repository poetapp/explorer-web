import * as React from 'react'
import { ClassNameProps } from 'poet-js'
import { UtxosByAddressResponse } from 'insight-client-js'

import { InsightClient } from 'Insight'
import { ResourceProvider, ResourceLocator } from 'components/ResourceProvider'
import { BitcoinToCurrency } from 'pages/Account/Wallet/BitcoinToCurrency'

export interface WalletBalanceProps extends ClassNameProps {
  readonly address: string;
  readonly dual?: boolean;
}

export interface WalletBalanceState {
  readonly btcFirst: boolean;
}

export class WalletBalance extends ResourceProvider<UtxosByAddressResponse, WalletBalanceProps, WalletBalanceState> {

  constructor() {
    super(...arguments);
    this.state = {
      btcFirst: false
    }
  }

  resourceLocator(): ResourceLocator {
    return {
      url: InsightClient.Address.Utxos.url(this.props.address)
    }
  }

  renderElement(unspentTransactionOutputs: UtxosByAddressResponse) {
    const satoshis = unspentTransactionOutputs.map(a => a.satoshis).reduce((a, b) => a + b, 0);
    const btc = satoshis / 100000000;

    return (
      <section className={this.props.className} onClick={() => this.props.dual && this.setState({ btcFirst: !this.state.btcFirst })}>
        { this.props.dual ? this.renderDual(btc) : this.renderSimple(btc) }
      </section>
    )
  }

  renderLoading() {
    return (
      <section className={this.props.className}>
        Loading...
      </section>
    )
  }

  private renderSimple(btc: number) {
    return this.renderBtc(btc)
  }

  private renderDual(btc: number) {
    return [
      <div className="primary" key="primary">
        { this.state.btcFirst ? this.renderBtc(btc) : this.renderForeign(btc) }
      </div>,
      <div className="secondary" key="secondary">
        { !this.state.btcFirst ? this.renderBtc(btc) : this.renderForeign(btc) }
      </div>
    ];
  }

  private renderBtc(btc: number) {
    return <span>{btc.toFixed(8)} BTC</span>
  }

  private renderForeign(btc: number) {
    return <span><BitcoinToCurrency amount={btc} currency="USD" /> USD</span>
  }

}