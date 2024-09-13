# fromPairs

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

キーと値のペアの配列をオブジェクトに変換します。

## インターフェース

```typescript
function fromPairs(pairs: any[]): Record<string, any>;
function fromPairs<T extends PropertyKey, U>(pairs: Array<[T, U]> | Map<T, U>): Record<T, U>;
function fromPairs<T extends PropertyKey, U>(data: Array<[T, U]> | Map<T, U>): Record<T, U>;
```

### パラメータ

- `pairs` (`Array<[T, U]>`): 各キーが`PropertyKey`であり、各値が型`U`であるキーと値のペアの配列です。

### 戻り値

(`Record<T, U>`): キーが型`T`であり、値が型`U`であるオブジェクトです。

## 例

```typescript
const pairs = [
  ['a', 1],
  ['b', 2],
];
const result = fromPairs(pairs);
// result will be: { a: 1, b: 2 }
```
