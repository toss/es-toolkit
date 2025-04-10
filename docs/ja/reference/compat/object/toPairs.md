# toPairs

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクト、`Set`、または `Map` からプロパティと値をペアにした要素の配列を作成します。

- オブジェクトが提供されると、オブジェクトのプロパティと値をペアにした要素（`[key, value]`）の配列を返します。
- `Set` が提供されると、要素を `[value, value]` 形式でペアにした配列を返します。
- `Map` が提供されると、キーと値をペアにした要素（`[key, value]`）の配列を返します。

## インターフェース

```typescript
function toPairs<T>(object: Record<string | number, T>): Array<[string, T]>;
function toPairs<T>(set: Set<T>): Array<[T, T]>;
function toPairs<K, V>(map: Map<K, V>): Array<[K, V]>;
```

### パラメータ

- `object` (`Record<string | number, T> | Set<T> | Map<K, V>`): クエリするオブジェクト、`Set`、または`Map`。

### 戻り値

(`Array<[key: PropertyKey, value: T]>`): キーと値のペアの配列を返します。

## 例

```typescript
const object = { a: 1, b: 2 };
toPairs(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairs(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairs(map); // [['a', 1], ['b', 2]]
```
