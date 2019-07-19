export const mapObjectEntries = (o, f) =>
  Object.fromEntries(Object.entries(o).map(([key, value]) => [key, f(key, value)]))
