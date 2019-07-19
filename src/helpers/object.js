export const mapObjectEntries = (o, f) =>
  Object.fromEntries(Object.entries(o).map(([key, value]) => [key, f(key, value)]))

export const filterObjectEntries = (o, f) =>
  Object.fromEntries(Object.entries(o).filter(f))
