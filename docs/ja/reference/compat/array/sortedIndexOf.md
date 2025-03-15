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
const unSortedArray = [55, 33, 22, 11, 44];
const duplicateArray = [1, 2, 2, 3, 3, 3, 4];
const emptyArray = [];
const zeroMinusArray = [-0];
const zeroPlusArray = [0];
const floatingArray = [1.1, 2.2, 3.3];
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };

// 通常のケース
sortedIndexOf(numbers, 11);
// 戻り値: 0
// 説明: numbers配列における値11の位置は0です。

// 重複値
sortedIndexOf(duplicateArray, 3);
// 戻り値: 3
// 説明: 値3の最初の出現インデックスは3です。

// 存在しない値
sortedIndexOf(numbers, 30);
// 戻り値: -1
// 説明: 30は配列に存在しないため、-1を返します。

// 余分な引数
sortedIndexOf(numbers, 22, true);
// 戻り値: 1
// 説明: 余分な引数を追加しても無視されます。

// 浮動小数点値
sortedIndexOf(floatingArray, 2.2);
// 戻り値: 1
// 説明: 配列における値2.2の位置は1です。

// 空の配列
sortedIndexOf(emptyArray, 30);
// 戻り値: -1
// 説明: 空の配列で値を検索すると、-1を返します。

// undefinedと空の配列
sortedIndexOf(emptyArray, undefined);
// 戻り値: -1
// 説明: 空の配列で値を検索する場合、undefinedであっても常に-1を返します。

// ソートされていない配列
sortedIndexOf(unSortedArray, 11);
// 戻り値: -1
// 説明: ソートされていない配列を使用すると、-1を返します。

// -0と0は同じ扱い
sortedIndexOf(zeroMinusArray, 0);
// 戻り値: 0
// 説明: JavaScriptでは、-0と0は等しいとみなされます。

// -0と0は同じ扱い
sortedIndexOf(zeroPlusArray, -0);
// 戻り値: 0
// 説明: JavaScriptでは、-0と0は等しいとみなされます。

// 配列風オブジェクト
sortedIndexOf(arrayLike, 20);
// 戻り値: 1
// 説明: 配列風オブジェクトでも動作します。
```
