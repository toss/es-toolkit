# slice

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

インデックス `start` からインデックス `end` までの `array` の部分配列を作成します。部分配列には `end` は含まれません。

基本の `Array.prototype.slice` と異なり、スパース配列に対して密な配列を返しません。

## インターフェース

```typescript
function slice<T>(array: T[], start?: number, end?: number): T[];
```

### パラメータ

- `array` (`T[]`): 部分配列を作成する配列。

::: info `array` は `ArrayLike<T>`、`null`、または `undefined` になります。

lodash との完全な互換性を確保するため、`slice` 関数は `array` を次のように処理します。

- `array` が `ArrayLike<T>` の場合、`Array.from(...)` を使用して配列に変換されます。
- `array` が `null` または `undefined` の場合、空の配列として扱われます。

:::

- `start` (`number`): 開始位置。デフォルトは `0` です。
- `end` (`number`): 終了位置。デフォルトは `array.length` です。

### 戻り値

(`T[]`): `array` の `start` から `end` までの部分配列。

## 例

```typescript
slice([1, 2, 3], 1, 2); // => [2]
slice(new Array(3)); // => [undefined, undefined, undefined]
```
