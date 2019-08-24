export const uriToExplorerLink = uri =>
  uri.startsWith('poet:claims/')
    ? `/works/${uri.split('/')[1]}`
    : `/archives/${encodeURIComponent(uri)}`
