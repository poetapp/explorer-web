export const uriToExplorerLink = uri =>
  uri.startsWith('poet:claims/')
    ? `/works/${uri.split('/')[1]}`
    : `/archives/${encodeURIComponent(uri)}`

export const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
export const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
