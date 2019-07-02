export const withTotalCount = (array, totalCount) => {
  const arr = [...array]
  arr.totalCount = totalCount
  return arr
}

export const OfNumbers = length => Array(length).fill(undefined).map((e, i) => i)
