import * as React from 'react';
import { UrlObject } from 'poet-js';

import { publicKeyToAddress } from '../../../helpers/AddressHelper';
import { SelectProfileById } from '../../../components/atoms/Arguments';
import { PoetAPIResourceProvider } from '../../../components/atoms/base/PoetApiResource';
import { TransactionsByAddress } from './TransactionsByAddress';

import './Transactions.scss';

export class Transactions extends PoetAPIResourceProvider<ReadonlyArray<string>, SelectProfileById, undefined> {

  poetURL(): UrlObject {
    return {
      url: `/licenseTxs`,
      query: {
        profileId: this.props.profileId
      }
    }
  }

  renderElement(licenseTransactions: ReadonlyArray<string>, headers: Headers): JSX.Element {
    const address = publicKeyToAddress(this.props.profileId);
    return <TransactionsByAddress address={address} licenseTransactions={licenseTransactions} />;
  }

}

