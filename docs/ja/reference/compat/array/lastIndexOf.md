# lastIndexOf

::: info
この関数は互換性のために `es-toolkit/compat` でのみ利用可能です。代替となるネイティブ JavaScript API が存在するか、まだ完全に最適化されていない関数です。

`es-toolkit/compat` からインポートした場合、[こちら](../../../compatibility.md)で説明されているように、lodash と全く同じように動作し、同じ機能を提供します。
:::

配列内の値の最後の出現位置のインデックスを検索します。

このメソッドは `Array.prototype.lastIndexOf` と似ていますが、`NaN` 値も検索できます。
`NaN` 以外の要素の比較には厳密等価演算子（`===`）を使用します。

## シグネチャ

```typescript
function lastIndexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
```

### パラメータ

- `array` (`T[]`): 検索対象の配列。

::: info `array` は `ArrayLike<T>` または `null` または `undefined` も可能です

lodash との完全な互換性を確保するため、`lastIndexOf` 関数は `array` を以下のように処理します：

- `array` が `ArrayLike<T>` の場合、`Array.from(...)` を使用して配列に変換します。
- `array` が `null` または `undefined` の場合、空の配列として扱われます。

:::

- `searchElement` (`T`): 検索する値。
- `fromIndex` (`number`, オプション): 検索を開始するインデックス。

### 戻り値

(`number`): 配列内で値が最後に出現する位置のインデックス（0から始まる）。値が見つからない場合は `-1` を返します。

## 使用例

```typescript
const array = [1, 2, 3, NaN, 1];
lastIndexOf(array, 1); // => 4
lastIndexOf(array, NaN); // => 3
```
