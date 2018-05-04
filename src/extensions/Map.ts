interface KeyValue<K, V> {
  readonly key: K
  readonly value: V
}

interface Map<K, V> {
  toKeyValueArray(): ReadonlyArray<KeyValue<K, V>>
}

Map.prototype.toKeyValueArray = function() {
  return [...this.keys()]
    .filter(key => this.get(key))
    .map(key => ({ key, value: this.get(key) }))
}
