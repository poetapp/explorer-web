import * as bitcore from 'bitcore-lib'

export function getSighash(tx: Transaction, address: Address) {
  return tx.inputs.map(
    (input: any, index: number) =>
      bitcore.Transaction.Sighash.sighashPreimage(
        tx,
        bitcore.crypto.Signature.SIGHASH_ALL,
        index,
        bitcore.Script.buildPublicKeyHashOut(address)
      )
  )
}

export function applyHexSignaturesInOrder(tx: Transaction, signatures: any, publicKey: PublicKey) {
  return tx.inputs.map(
    (input: any, index: number) => {
      tx.applySignature({
        inputIndex: index,
        sigtype: bitcore.crypto.Signature.SIGHASH_ALL,
        publicKey: publicKey,
        signature: bitcore.crypto.Signature.fromDER(new Buffer(signatures[index].signature, 'hex'))
      })
    }
  )
}
