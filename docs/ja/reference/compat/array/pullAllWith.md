# pullAllWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供された比較関数を使用して、配列から削除する要素を判断し、削除して返します。

比較対象の配列（`values`）の要素と比較関数（`comparator`）を使用して元の配列（`array`）の要素を比較し、比較結果が `true` となる要素を元の配列から削除します。

## インターフェース

```typescript
function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[];
```

### パラメータ

- `array` (`T[]`): 変更する配列。
- `values` (`T[]`): 配列から削除する値。
- `comparator` (`(a: T, b: T) => boolean`): `array` の要素と `values` の要素を比較する関数。二つの要素が等しい場合は `true` を返す必要があります。

### 戻り値

(`T[]`): 指定された値が削除された配列。

## 例

```typescript
import { pullAllWith } from 'es-toolkit/array';

const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

const removed = pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => JSON.stringify(a) === JSON.stringify(b));

console.log(removed); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
console.log(array); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```
