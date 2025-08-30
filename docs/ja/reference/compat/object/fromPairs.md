# fromPairs

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

キーと値のペアの配列をオブジェクトに変換します。

## インターフェース

```typescript
function fromPairs<T>(pairs: ArrayLike<[PropertyName, T]> | null | undefined): Record<string, T>;
function fromPairs(pairs: ArrayLike<any[]> | null | undefined): Record<string, any>;
```

### パラメータ

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): 変換するキーと値のペアの配列またはMapデータ。2次元配列の各サブ配列は、2つの要素を持ち、最初の要素をキーとし、2番目の要素を値として使用する必要があります。

### 戻り値

(`Record<string, any> | Record<string, T>`): 入力パラメータと同じキーと値を持つ変換されたオブジェクト。

## 例

```typescript
const pairs = [
  ['a', 1],
  ['b', 2],
];
const result = fromPairs(pairs);
// result will be: { a: 1, b: 2 }
```
