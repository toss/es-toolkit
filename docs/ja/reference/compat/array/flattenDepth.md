# flattenDepth

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列を指定された深さまでフラット化します。

## インターフェース

```typescript
function flattenDepth<T, D extends number = 1>(value: T[], depth: D): Array<FlatArray<T[], D>> | [];
```

### パラメータ

- `value` (`T[]`): フラット化する値。

::: info `value` は `ArrayLike<T>`、`null`、または `undefined` になります。

lodash との完全な互換性を確保するため、`flattenDepth` 関数は `value` を次のように処理します。

- `value` が `ArrayLike<T>` の場合、`Array.from(...)` を使用して配列に変換されます。
- `value` が `null` または `undefined` の場合、空の配列として扱われます。

:::

- `depth` (`D`): ネストされた配列構造をどの深さまでフラット化するかを指定する深さレベル。デフォルトは1です。

### 戻り値

(`Array<FlatArray<T[], D>> | []`): フラット化された新しい配列。

## 例

```typescript
const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 1);
// Returns: [1, 2, 3, 4, [5, 6]]

const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 2);
// Returns: [1, 2, 3, 4, 5, 6]
```
