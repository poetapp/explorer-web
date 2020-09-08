export const uriToExplorerLink = uri =>
  urlIsPoetClaim(uri)
    ? `/works/${poetClaimUrlToClaimId(uri)}`
    : `/archives/${encodeURIComponent(uri)}`

export const bitcoinLink = tx => `https://entropy.rocks/transaction/${tx}`
export const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`
export const urlIsIpfs = url => url.startsWith('https://ipfs.io/ipfs/')
export const ipfsUrlToHash = url => url.split('/').reverse()[0]
export const urlIsPoetClaim = url => url.startsWith('poet:claims/')
export const poetClaimUrlToClaimId = url => url.split('/')[1]
export const claimIdToUri = id => `poet:claims/${id}`
