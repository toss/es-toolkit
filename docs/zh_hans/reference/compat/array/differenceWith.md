# differenceWith（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 `differenceWith`

此 `differenceWith` 函数由于处理 `null` 和 `undefined`、多个数组处理、`ArrayLike` 类型处理等而运行较慢。

请使用 `es-toolkit` 中更快、更现代的 [differenceWith](../../array/differenceWith.md)。

:::

使用比较函数从第一个数组中删除其他数组中包含的元素。

```typescript
const result = differenceWith(array, ...values, comparator);
```

## 用法

### `differenceWith(array, ...values, comparator)`

当你想要用比较函数比较每个元素来求差时,使用 `differenceWith`。最后一个参数成为比较函数。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 按id比较对象
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const others = [{ id: 2 }];
const comparator = (a, b) => a.id === b.id;

differenceWith(objects, others, comparator);
// Returns: [{ id: 1 }, { id: 3 }]

// 一次排除多个数组
const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];

differenceWith(array, values1, values2, comparator);
// Returns: [{ id: 1 }, { id: 4 }]
```

不提供比较函数时,像普通 `difference` 一样工作。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 不使用比较函数时进行普通比较
differenceWith([1, 2, 3], [2], [3]);
// Returns: [1]
```

也可以使用复杂的比较逻辑。

```typescript
import { differenceWith } from 'es-toolkit/compat';

const users = [
  { name: 'alice', age: 25 },
  { name: 'bob', age: 30 },
  { name: 'charlie', age: 35 },
];
const excludeUsers = [{ name: 'bob', age: 25 }]; // 不同的年龄

// 只按名称比较
const compareByName = (a, b) => a.name === b.name;
differenceWith(users, excludeUsers, compareByName);
// Returns: [{ name: 'alice', age: 25 }, { name: 'charlie', age: 35 }]
// bob被排除(即使年龄不同,名称相同)
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 求差的基准数组。
- `...values` (`Array<ArrayLike<T>>` + `(a: T, b: T) => boolean`): 包含要排除的元素的数组,最后是比较函数。

#### 返回值

(`T[]`): 返回使用比较函数从第一个数组中删除其余数组元素的新数组。
