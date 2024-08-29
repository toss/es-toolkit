# last

配列の最後の要素を返します。

空の配列の場合、`undefined`を返します。

## インターフェース

```typescript
function last<T>(arr: [...T[], T]): T;
function last<T>(arr: T[]): T | undefined;
```

### パラメータ

- `arr`(`T[]`): 最後の要素を返す配列。

### 戻り値

(`T | undefined`): 配列の最後の要素、空の配列の場合は`undefined`を返します。

## 例

```typescript
const arr1 = [1, 2, 3];
const result = last(arr1);
// resultは3です。

const arr2: number[] = [];
const result = last(arr2);
// resultはundefinedです。

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = last(largeArray);
// resultは999です。

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = last(nestedArray);
// resultは[3,3]です。
```
