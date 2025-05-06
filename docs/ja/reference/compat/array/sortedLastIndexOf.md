# sortedLastIndexOf

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。これは、代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

ソートされた配列で値が最後に現れるインデックスを見つけます。 `Array#lastIndexOf` と似ていますが、ソートされた配列に特化しています。

::: warn ソートされた配列を引数として提供してください

この関数はバイナリ検索（Binary search）を使用してインデックスを迅速に見つけるため、ソートされた配列を提供しないと正しく動作しません。

:::

## インターフェース

```typescript
function sortedLastIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### パラメータ

- `array` (`ArrayLike | null | undefined`): ソートされた配列です。配列が `null` または `undefined` の場合、`-1` を返します。
- `value` (`T`): ソートされた配列内で比較を通じて探す値。

### 戻り値

( `number` ): 最後に一致した値のインデックスを返し、一致しない場合は -1 を返します。

## 例

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
sortedLastIndexOf(numbers, 3); // 戻り値: 2
sortedLastIndexOf(numbers, 6); // 戻り値: -1

// 値が重複している場合、最後の値のインデックスを返します。
const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
sortedLastIndexOf(duplicateNumbers, 3); // 戻り値: 5

// 配列がソートされていない場合、間違ったインデックスを返すことがあります。
const unSortedArray = [55, 33, 22, 11, 44];
sortedLastIndexOf(unSortedArray, 11); // 戻り値: -1

// -0 と 0 は同じように扱われます。
const mixedZeroArray = [-0, 0];
sortedLastIndexOf(mixedZeroArray, 0); // 戻り値: 1
sortedLastIndexOf(mixedZeroArray, -0); // 戻り値: 1

// 配列のようなオブジェクトでも動作します。
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 20 };
sortedLastIndexOf(arrayLike, 20); // 戻り値: 2
```
