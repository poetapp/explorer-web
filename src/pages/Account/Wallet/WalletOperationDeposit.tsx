import * as React from 'react';
const QR = require('react-qr');
import { Link } from 'react-router';

import { CopyableText } from '../../../components/atoms/CopyableText';

import './WalletOperationDeposit.scss';

interface WalletOperationDepositProps {
  readonly address: string;
}

export function WalletOperationDeposit(props: WalletOperationDepositProps) {
  return (
    <div className="wallet-operation-deposit">
      <div className="qr">
        <QR text={props.address}/>
      </div>
      <CopyableText text={props.address} className="address"/>
      <nav>
        <Link to={`bitcoin:${props.address}`} className="button-secondary">Open in Desktop Wallet</Link>
      </nav>
    </div>
  )
}