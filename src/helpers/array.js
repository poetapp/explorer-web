export const withTotalCount = (array, totalCount) => {
  const arr = [...array]
  arr.totalCount = totalCount
  return arr
}

export const ofNumbers = (length, base = 0) => Array(length).fill(undefined).map((e, i) => i + base)

export const flattenArray = (arr1) =>
  arr1.reduce((acc, val) =>
      Array.isArray(val)
        ? acc.concat(flattenArray(val))
        : acc.concat(val),
    [],
  )
