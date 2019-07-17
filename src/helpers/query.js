export const objectToQueryParams = obj =>
  Object.entries(obj).map(([key, value]) => `${key}=${value}`)

