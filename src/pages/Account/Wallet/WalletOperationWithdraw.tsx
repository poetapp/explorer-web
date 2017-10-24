import * as React from 'react';

const bitcore = require('bitcore-lib');

import './WalletOperationWithdraw.scss';

interface WalletOperationWithdrawProps {
  readonly address: string
  readonly balance: number
  readonly requestWithdrawal: (_: WalletOperationWithdrawState) => void
}

export interface WalletOperationWithdrawState {
  readonly amountInSatoshis?: number
  readonly paymentAddress?: string
  readonly amountInBTC?: number
  readonly errorAmount?: boolean
  readonly errorAddress?: boolean
}

export class WalletOperationWithdraw extends React.Component<WalletOperationWithdrawProps, WalletOperationWithdrawState> {

  constructor() {
    super(...arguments);
    this.state = {
      amountInBTC: 1,
      paymentAddress: ''
    };
  }

  render() {
    return (
      <section className="wallet-operation-withdraw">
        <main>
          <div className="input">
            <label>Amount to withdraw</label>
            <input
              type="number"
              name="amountInSatoshis"
              value={this.state.amountInBTC}
              onChange={this.onAmountChange}
              min={0}
              step={.1}
            >
            </input>
            <small>Fees will be subtracted from this amount</small>
          </div>
          <div className="input">
            <label>Payment Address</label>
            <input
              type="text"
              name="paymentAddress"
              value={this.state.paymentAddress}
              onChange={(event: any) => this.setState({ paymentAddress: event.target.value })}
              placeholder="Payment Address">
            </input>
          </div>
        </main>
        <nav>
          <button className="button-secondary" onClick={this.requestWithdrawal}>Withdraw</button>
        </nav>
      </section>
    )
  }

  private onAmountChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ amountInBTC: parseFloat(event.currentTarget.value) || 0 })
  };

  private requestWithdrawal = () => {
    const amountInSatoshis = Math.round(parseFloat((''+this.state.amountInBTC)) * 1e8);
    if (amountInSatoshis > this.props.balance) {
      this.setState({ errorAmount: true })
    } else if (!bitcore.Address.isValid(this.state.paymentAddress)) {
      this.setState({ errorAddress: true })
    } else {
      this.props.requestWithdrawal({
        amountInSatoshis,
        paymentAddress: this.state.paymentAddress
      })
    }
  };

}