interface IFastMap<T, U> {
  /**
   * Removes all key-value pairs from the Map object.
   */
  clear(): void;

  /**
   * Returns the value associated to the key, or undefined if there is none.
   */
  get(key: T): U | undefined;

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the Map object or not.
   */
  has(key: T): boolean;

  /**
   * Sets the value for the key in the Map object. Returns the Map object.
   */
  set(key: T, value: U): this;

  /**
   * Returns the number of key/value pairs in the Map object.
   */
  readonly size: number;

  /**
   * Removes any value associated to the key and returns true if there was one, or false if there was not.
   */
  delete(key: T): boolean;
}

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
export class FastMap<T, U> implements IFastMap<T, U> {
  private _keyableMapForOthers = new HashMap<ObjectKeyType, U>();
  private _keyableMapForStr = new HashMap<ObjectKeyType, U>();
  private _nonKeyableMap: Map<T, U> = new Map();

  set(key: T, value: U): this {
    this._getMap(key).set(key as any, value);
    return this;
  }

  get(key: T): U | undefined {
    return this._getMap(key).get(key as any);
  }

  has(key: T): boolean {
    return this._getMap(key).has(key as any);
  }

  clear(): void {
    this._keyableMapForOthers = new HashMap();
    this._keyableMapForStr = new HashMap();
    this._nonKeyableMap.clear();
  }

  delete(key: T): boolean {
    return this._getMap(key).delete(key as any);
  }

  get size(): number {
    return this._keyableMapForStr.size + this._keyableMapForOthers.size + this._nonKeyableMap.size;
  }

  private _isKeyable(key: unknown): key is ObjectKeyType {
    const type = typeof key;
    return type === 'string' || type === 'number' || type === 'symbol';
  }

  private _getMap(key: T) {
    if (this._isKeyable(key)) {
      if (typeof key === 'string') {
        return this._keyableMapForStr;
      }
      return this._keyableMapForOthers;
    }

    return this._nonKeyableMap;
  }
}

class HashMap<T extends ObjectKeyType, U> implements IFastMap<T, U> {
  private _table = Object.create(null);

  set(key: T, value: U) {
    this._table[key] = value;
    return this;
  }

  get(key: T) {
    return this._table[key];
  }

  has(key: T) {
    return key in this._table;
  }

  delete(key: T) {
    return delete this._table[key];
  }

  clear() {
    this._table = Object.create(null);
  }

  get size() {
    return Object.keys(this._table).length;
  }

  keys() {
    return Object.keys(this._table);
  }

  values() {
    return Object.values(this._table);
  }
}
