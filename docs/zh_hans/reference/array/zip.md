# zip

将多个数组组合成一个元组数组。

该函数接受多个数组作为输入，并返回一个新数组，其中每个元素都是一个元组，包含来自输入数组的对应元素。

如果输入数组的长度不同，结果数组的长度将取决于最长的输入数组，缺失的元素将用 `undefined` 值填充。

## 签名

```typescript
function zip<T>(arr1: T[]): [T][];
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
function zip<T, U, V>(arr1: T[], arr2: U[], arr3: V[]): [T, U, V][];
function zip<T, U, V, W>(arr1: T[], arr2: U[], arr3: V[], arr4: W[]): [T, U, V, W][];
function zip<T>(...arrs: T[][]): T[][];
```

### 参数

- `...arrs` (`T[][]`): 要合并的数组。

### 返回值

(`T[][]`): 包含来自输入数组的对应元素的新数组，每个元素都是一个元组。

## 示例

```typescript
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// result 将会是 [[1, 'a'], [2, 'b'], [3, 'c']]

const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// result2 将会是 [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]
```
