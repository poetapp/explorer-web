declare var bitcore: bitcoreLib;

declare module 'bitcore-lib' {
  export = bitcore;
}

type BN = any;

interface bitcoreLib {
  version: string
  crypto: CryptoInterface
  encoding: EncodingInterface
  util: UtilsInterface

  Address: IAddress
  Block: IBlock
  MerkleBlock: IMerkleBlock
  BlockHeader: IBlockHeader
  HDPrivateKey: IHDPrivateKey
  HDPublicKey: IHDPublicKey
  Networks: INetworks
  Opcode: IOpcode
  PrivateKey: IPrivateKey
  PublicKey: IPublicKey
  Script: IScript
  Transaction: ITransaction
  URI: IURI
  Unit: IUnit
}

interface IAddress {
  (source: string, network: Network): Address
  (source: PublicKey, network: Network): Address

  isValid(something: any): boolean
}
interface Address {

}
interface IBlock {}
interface IMerkleBlock {}
interface IBlockHeader {}
interface IHDPrivateKey {}
interface IHDPublicKey {}
interface INetworks {
  defaultNetwork: Network
  testnet: Network
  livenet: Network
  mainnet: Network
}
interface Network {
}
interface IOpcode {}
interface IPrivateKey {
  (source: string): PrivateKey
}
interface PrivateKey {

}
interface IPublicKey {
  (source: string): PublicKey
}
interface PublicKey {}

interface IScript {
  buildPublicKeyHashOut(address: Address): Script
}
interface Script {}
interface ITransaction {
  new (): Transaction
  (): Transaction
  UTXO: IUTOX
  Sighash: ISighash
}
interface ISighash {
  sighashPreimage(tx: Transaction, sighash: number, index: number, script: Script): Buffer
}
interface Transaction {
  inputs: Input[]
  outputs: Output[]
  id: string
  nid: string
  from(utxos: UTXO[]): Transaction
  to(address: Address, amount: number): Transaction
  to(address: string, amount: number): Transaction
  change(address: Address): Transaction
  change(address: string): Transaction
  sign(privateKey: PrivateKey): Transaction
  sign(privateKey: string): Transaction
  applySignature(sig: Signature): Transaction
}
interface Input {

}
interface Output {

}
interface IUTOX {
  (source: any): UTXO
}
interface UTXO {
}
interface IURI {}
interface IUnit {}

/**
 * Crypto
 */

interface CryptoInterface {
  BN: BN
  ECDSA: ECDSAInterface
  Hash: HashInterface
  Random: RandomInterface
  Point: PointInterface
  Signature: SignatureInterface
}

interface ECDSAInterface {
}
interface HashInterface {
  sha256(buffer: Buffer): Uint8Array
}
interface RandomInterface {
}
interface PointInterface {
}
interface SignatureInterface {
  SIGHASH_ALL: number
  fromDER(sig: Buffer): Signature
}
interface Signature {}

/**
 * Encoding
 */
interface EncodingInterface {
}


/**
 * Utils
 */
interface UtilsInterface {}