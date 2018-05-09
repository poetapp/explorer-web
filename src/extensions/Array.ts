interface Array<T> {
  filterTruthy(): T[]
  toObject(cb: (el: any) => { key: string; value: any }): any
}
interface ReadonlyArray<T> {
  filterTruthy(): T[]
  toObject(cb: (el: any) => { key: string; value: any }): any
}

if (!Array.prototype.includes)
  Array.prototype.includes = function(elem) {
    return this.indexOf(elem) !== -1
  }

Array.prototype.filterTruthy = function() {
  return this.filter((a: any) => a)
}

Array.prototype.toObject = function(cb: (el: any) => { key: string; value: any }) {
  const object: any = {}

  for (const el of this) {
    const { key, value } = cb(el)
    object[key] = value
  }

  return object
}
