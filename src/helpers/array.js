export const withTotalCount = (array, totalCount) => {
  const arr = [...array]
  arr.totalCount = totalCount
  return arr
}
