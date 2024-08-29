# unzipWith

結合された2次元配列を1次元配列に解き、`iteratee`関数で値を変換して新しい配列を返します。

## インターフェース

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### パラメータ

- `target` (`T[][]`): 結合を解いて変換する配列です。
- `iteratee` (`(...args: T[]) => R`): 結合が解かれた配列を変換する関数です。

### 戻り値

(`R[]`): 結合を解いて変換された値で作られた新しい配列です。

## 例

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```
