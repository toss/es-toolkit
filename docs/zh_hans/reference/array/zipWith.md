# zipWith

将多个数组使用自定义组合函数合并为单个数组。

该函数接受多个数组和一个组合函数，并返回一个新数组，其中每个元素是将组合函数应用于输入数组的对应元素的结果。

## 签名

```typescript
function zipWith<T, R>(arr1: T[], combine: (item: T) => R): R[];
function zipWith<T, U, R>(arr1: T[], arr2: U[], combine: (item1: T, item2: U) => R): R[];
function zipWith<T, U, V, R>(arr1: T[], arr2: U[], arr3: V[], combine: (item1: T, item2: U, item3: V) => R): R[];
function zipWith<T, U, V, W, R>(
  arr1: T[],
  arr2: U[],
  arr3: V[],
  arr4: W[],
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
```

### 参数

- `arr1` (`T[]`): 第一个要合并的数组。
- `arr2` (`U[]`, 可选): 第二个要合并的数组。
- `arr3` (`V[]`, 可选): 第三个要合并的数组。
- `arr4` (`W[]`, 可选): 第四个要合并的数组。
- `combine` (`(item1: T, item2: U, item3: V, item4: W) => R`): 接受每个数组对应元素并返回单个值的组合函数。

### 返回值

(`R[]`): 一个新数组，其中每个元素是将组合函数应用于输入数组的对应元素的结果。

## 示例

```typescript
// 与两个数组一起使用的示例：
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = zipWith(arr1, arr2, (a, b) => a + b);
// result 将会是 [5, 7, 9]

// 与三个数组一起使用的示例：
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const result = zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`);
// result 将会是 ['135', '246']
```
