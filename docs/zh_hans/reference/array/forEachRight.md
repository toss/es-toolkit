# forEachRight

从右到左迭代 `arr` 数组的每个元素，并对每个元素调用 `callback` 函数。

## 签名

```ts
function forEachRight<T>(arr: T[], callback: (value: T, index: number, arr: T[]) => void): void;
```

### 参数

- `arr` (`T[]`): 要迭代的数组。
- `callback` (`(value: T, index: number, arr: T[])`): 每次迭代调用的函数。
  - `value`: 数组中当前正在处理的元素。
  - `index`: 数组中当前正在处理的元素的索引。
  - `arr`: 被调用 `forEachRight` 的数组。

### 返回值

`void`

## 示例

```ts
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// 使用 `forEachRight` 函数迭代数组，并将每个元素添加到结果数组中。
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // Output: [3, 2, 1];
```
