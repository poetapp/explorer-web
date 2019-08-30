export const uriToExplorerLink = uri =>
  uri.startsWith('poet:claims/')
    ? `/works/${uri.split('/')[1]}`
    : `/archives/${encodeURIComponent(uri)}`

export const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
export const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
export const urlIsIpfs = url => url.startsWith('https://ipfs.io/ipfs/')
export const ipfsUrlToHash = url => url.split('/').reverse()[0]
export const urlIsPoetClaim = url => url.startsWith('poet:claims/')
export const poetClaimUrlToClaimId = url => url.split('/')[1]
