const bitcore = require('bitcore-lib');

const MOCK_KEY = '_mockKey';

let retrieved: string;

export function getMockPrivateKey() {
  if (retrieved) {
    return retrieved;
  }
  retrieved = localStorage.getItem('_mockKey') || unsafeRandomKey();
  localStorage.setItem(MOCK_KEY, retrieved);
  return retrieved
}

function unsafeRandomKey() {
  return bitcore.crypto.Hash.sha256(new Buffer(''+Math.random())).toString('hex');
}