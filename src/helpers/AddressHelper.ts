const bitcore = require('bitcore-lib');

export function publicKeyToAddress(publicKey: any /* TODO: TYPE: bitcore.PublicKey */): string {
  return bitcore.Address.fromPublicKey(bitcore.PublicKey(publicKey), bitcore.Networks.testnet).toString();
}
