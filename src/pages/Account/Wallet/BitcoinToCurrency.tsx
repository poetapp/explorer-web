// TODO: move this file to components/atoms/

import * as React from 'react'

import { Configuration } from 'configuration'
import { ResourceProvider, ResourceLocator } from 'components/ResourceProvider'

export interface BitcoinToCurrencyProps {
  readonly currency: string
  readonly amount: number
}

export interface BlockchainTicker {
  readonly [currency: string]: {
    '15m': number
    last: number
    buy: number
    sell: number
    symbol: string
  }
}

export class BitcoinToCurrency extends ResourceProvider<BlockchainTicker, BitcoinToCurrencyProps, undefined> {

  resourceLocator(): ResourceLocator {
    return {
      url: Configuration.api.blockchain + '/ticker?cors=true'
    }
  }

  renderElement(blockchainTicker: BlockchainTicker) {
    if (!blockchainTicker[this.props.currency])
      return <span>Ticker information not available in currency {this.props.currency}</span>;

    return <span>{(blockchainTicker[this.props.currency].last * this.props.amount).toFixed(2)}</span>
  }

}