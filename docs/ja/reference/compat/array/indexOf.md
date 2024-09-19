# indexOf

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列内で指定された要素が最初に一致するインデックスを見つけます。

`Array.prototype.indexOf` とほぼ同じように動作しますが、`NaN` 値を見つけることができます。
`NaN` 以外の要素を比較する際は、厳密等価演算子（`===`）を使用します。

## インターフェース

```typescript
function indexOf<T>(array: T[] | null | undefined, searchElement: T, fromIndex?: number): number;
```

### パラメータ

- `array` (`T[] | null | undefined`): 検索対象の配列。
- `searchElement` (`T`): 検索する値。
- `fromIndex` (`number`, オプション): 検索を開始するインデックス。

### 戻り値

(`number`): 配列内で指定された値と最初に一致する要素のインデックス。一致する要素が見つからない場合は `-1` を返します。

## 例

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
