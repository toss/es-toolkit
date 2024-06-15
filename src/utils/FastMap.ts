type ObjectKeyType = string | number | symbol;

/**
 * A faster alternative to the built-in Map class for use cases where there are a large number of
 * keys and values.
 *
 * NOTE!!) If you are using the size < 120, using the built-in Map class instead is much more performant.
 *
 * @example
 * const map = new FastMap();
 * map.set('key', 'value');
 * map.get('key'); // 'value'
 */
export class FastMap<T, U> implements Map<T, U> {
  [Symbol.toStringTag] = '__FastMap_es_toolkit__';

  private _keyableMap: Record<ObjectKeyType, U> = Object.create(null);
  private _nonKeyableMap: Map<T, U> = new Map();

  constructor(entries?: ReadonlyArray<readonly [T, U]> | null) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  set(key: T, value: U): this {
    if (this._isKeyable(key)) {
      this._keyableMap[key] = value;
    } else {
      this._nonKeyableMap.set(key, value);
    }
    return this;
  }

  get(key: T): U | undefined {
    if (this._isKeyable(key)) {
      return this._keyableMap[key];
    } else {
      return this._nonKeyableMap.get(key);
    }
  }

  has(key: T): boolean {
    if (this._isKeyable(key)) {
      return key in this._keyableMap;
    } else {
      return this._nonKeyableMap.has(key);
    }
  }

  clear(): void {
    this._keyableMap = Object.create(null);
    this._nonKeyableMap.clear();
  }

  delete(key: T): boolean {
    if (this._isKeyable(key)) {
      return delete this._keyableMap[key];
    } else {
      return this._nonKeyableMap.delete(key);
    }
  }

  get size(): number {
    return Object.keys(this._nonKeyableMap).length + this._nonKeyableMap.size;
  }

  [Symbol.iterator](): IterableIterator<[T, U]> {
    return this.entries();
  }

  entries(): IterableIterator<[T, U]> {
    const keyableEntries = Object.entries(this._keyableMap) as Array<[T, U]>;
    const nonKeyableEntries = Array.from(this._nonKeyableMap.entries());
    return keyableEntries.concat(nonKeyableEntries)[Symbol.iterator]();
  }

  keys(): IterableIterator<T> {
    const keyableKeys = Object.keys(this._keyableMap) as T[];
    const nonKeyableKeys = Array.from(this._nonKeyableMap.keys());
    return keyableKeys.concat(nonKeyableKeys)[Symbol.iterator]();
  }

  values(): IterableIterator<U> {
    const keyableValues = Object.values(this._keyableMap) as U[];
    const nonKeyableValues = Array.from(this._nonKeyableMap.values());
    return keyableValues.concat(nonKeyableValues)[Symbol.iterator]();
  }

  forEach(callbackfn: (value: U, key: T, map: Map<T, U>) => void, thisArg?: any): void {
    for (const [key, value] of this) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  private _isKeyable(key: unknown): key is ObjectKeyType {
    const type = typeof key;
    return type === 'string' || type === 'number' || type === 'symbol';
  }
}
