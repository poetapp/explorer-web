export const asyncPipe = (...fns) =>
  (v) => fns.reduce(async (a, c) => c(await a), Promise.resolve(v))

export const unaryFetch = ({ url, init}) => fetch(url, init)
