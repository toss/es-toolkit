# initial

配列の最後の要素を除いた残りの要素で構成される新しい配列を返します。

空の配列や長さが1の配列の場合、空の配列（`[]`）を返します。

## インターフェース

```typescript
function initial<T>(arr: T[]): T[];
```

### パラメータ

- `arr`（`T[]`）：最後の要素を除く配列。

### 戻り値

（`T[]`）：配列の最後の要素を除いた残りの配列。空の配列や長さが1の配列の場合、空の配列（`[]`）を返します。

## 例

```typescript
const arr1 = [1, 2, 3];
const result = initial(arr1);
// resultは[1, 2]です。

const arr2: number[] = [];
const result = initial(arr2);
// resultは[]です。

const arr3: number[] = [1];
const result = initial(arr3);
// resultは[]です。

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = initial(largeArray);
// resultは[0, 1, 2 ..., 998]です。

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = initial(nestedArray);
// resultは[[3, 1], [3, 2]]です。
```
