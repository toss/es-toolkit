# unzipWith

将一个嵌套的数组解压缩，并对重新分组的元素应用一个 `iteratee` 函数。

## 签名

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### 参数

- `target` (`T[][]`): 要解压缩的嵌套数组。这是一个数组的数组，其中每个内部数组包含要解压缩的元素。
- `iteratee` (`(...args: T[]) => R`): 用于转换解压缩后的元素的函数。

### 返回值

(`R[]`): 新的解压缩和转换后的元素数组。

## 示例

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `unzipWith` 可以获得与 Lodash 的完全兼容性。

兼容模式下提供以下功能：

- **null/undefined 处理**：当输入数组为 null 或 undefined 时，返回空数组。
- **类数组对象**：除了普通数组外，还可以处理类数组对象(array-like objects)。
- **iteratee 函数**：iteratee 函数接收重新分组的元素作为参数，可以将其转换为任意类型。当 iteratee 为 null 或 undefined 时，函数会像 `unzip` 一样工作，返回未转换的解压缩数组。

### 签名

```typescript
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];
function unzipWith<T, R>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: T[]) => R
): R[];
function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];
```

### 示例

```typescript
// 使用 iteratee 函数的示例
const array1 = [[1, 3], [2, 4]];
const result1 = unzipWith(array3, (a, b) => a + b);
// result3 为 [3, 7]，因为提供了 iteratee 函数时会转换重新分组的元素。

// iteratee 为 null 或 undefined 的情况
const array2 = [[1, 3], [2, 4]];
const result2 = unzipWith(array1, null);
// result1 为 [[1, 2], [3, 4]]，因为 iteratee 为 null 时会像 unzip 一样工作。

// 输入为 null 或 undefined 的情况
const result3 = unzipWith(null);
// result3 为 []，因为输入数组为 null。

// 使用类数组对象的示例
const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 };
const result4 = unzipWith(arrayLike, (a, b) => a + b);
// result4 为 [4, 6]，因为可以处理类数组对象。
```
