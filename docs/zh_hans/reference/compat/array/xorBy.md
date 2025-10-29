# xorBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [xorBy](../../array/xorBy.md)

此 `xorBy` 函数由于处理 `null` 或 `undefined`、复杂的重复计算逻辑等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [xorBy](../../array/xorBy.md)。

:::

根据转换函数创建一个由恰好存在于多个数组中的一个数组中的元素组成的新数组。

```typescript
const result = xorBy(...arrays, iteratee);
```

## 参考

### `xorBy(...arrays, iteratee)`

根据转换函数计算多个数组的对称差集。返回其转换结果恰好存在于数组中的一个数组中的元素。这在根据对象数组中的特定属性或数字数组中的特定计算结果进行比较时很有用。

```typescript
import { xorBy } from 'es-toolkit/compat';

// 通过 Math.floor 结果计算对称差集
xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// 返回: [1.2, 4.3]

// 通过对象属性计算对称差集
xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// 返回: [{ x: 2 }]

// 使用函数计算对称差集
const users1 = [{ name: 'John', age: 30 }];
const users2 = [
  { name: 'Jane', age: 25 },
  { name: 'John', age: 30 },
];
xorBy(users1, users2, user => user.name);
// 返回: [{ name: 'Jane', age: 25 }]

// 三个数组的对称差集
xorBy([1.2, 2.3], [3.4, 4.5], [5.6, 6.7], Math.floor);
// 返回: [1.2, 2.3, 3.4, 4.5, 5.6, 6.7]
```

`null` 或 `undefined` 被忽略。

```typescript
import { xorBy } from 'es-toolkit/compat';

xorBy([2.1, 1.2], null, [4.3, 2.4], Math.floor);
// 返回: [1.2, 4.3]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ValueIteratee<T>>`): 要计算对称差集的数组和末尾的转换函数。可以是函数、属性名称、部分对象等。

#### 返回值

(`T[]`): 返回一个根据转换函数结果由恰好存在于数组中的一个数组中的元素组成的新数组。
