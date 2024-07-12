# last

返回数组的最后一个元素。

该函数接受一个数组，并返回该数组的最后一个元素。如果数组为空，则函数返回 `undefined`。

## 签名

```typescript
function last<T>(arr: [...T[], T]): T;
function last<T>(arr: T[]): T | undefined;
```

### 参数

- `arr` (`T[]`): 要获取最后一个元素的数组。

### 返回值

(`T | undefined`): 数组的最后一个元素，如果数组为空则返回 `undefined`。

## 示例

```typescript
const arr1 = [1, 2, 3];
const result = last(arr1);
// result 将会是 3

const arr2: number[] = [];
const result = last(arr2);
// result 将会是 undefined

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = last(largeArray);
// result 将会是 999

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = last(nestedArray);
// result 将会是 [3,3]
```
