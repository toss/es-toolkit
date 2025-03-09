# sortedIndexOf

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。これは、代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

この関数は、ソートされた配列内で2番目の引数値が最初に出現するインデックスを見つけます。つまり、探している値がソートされた配列の何番目に位置しているかを教えてくれる関数です。[sortedIndex](./sortedIndex.md)関数を使用して、繰り返し比較した後にインデックスを返します。

## インターフェース

```typescript
export function sortedIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### パラメータ

- `array` (`ArrayLike | null | undefined`): ソートされた配列です。配列が null または undefined の場合、-1 を返します。
- `value` (`T`): ソートされた配列内で比較を通じて探す値。

### 戻り値

(`number`): ソート順序を維持するために値を挿入すべきインデックス。

## 例

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
const unSortedNumbers = [55, 33, 22, 11, 44];

// 通常のケース
sortedIndexOf(numbers, 11);
// 戻り値: 0
// 説明: numbers 配列において 11 と同じ値の位置は 0 です。

// 存在しない値
sortedIndexOf(numbers, 30);
// 戻り値: -1
// 説明: 30 は配列内に存在しないため、-1 を返します。

// 空の配列
sortedIndexOf([], 30);
// 戻り値: -1
// 説明: 空の配列内で値を探すと -1 を返します。

// ソートされていない配列
sortedIndexOf(unSortedNumbers, 11);
// 戻り値: -1
// 説明: ソートされていない配列を使用すると -1 を返します。
```
