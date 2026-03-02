# maxBy (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [maxBy](../../array/maxBy.md)

这个 `maxBy` 函数由于 iteratee 函数处理和类型转换会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [maxBy](../../array/maxBy.md)。

:::

在符合条件的值中查找最大值元素。

```typescript
const maxItem = maxBy(array, iteratee);
```

## 用法

### `maxBy(array, iteratee)`

在数组中查找函数计算值最大的元素。

```typescript
import { maxBy } from 'es-toolkit/compat';

// 对象数组中特定属性最大的元素
const people = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 35 },
];

maxBy(people, person => person.age);
// Returns: { name: '王五', age: 35 }

// 也可以使用属性名
maxBy(people, 'age');
// Returns: { name: '王五', age: 35 }
```

用函数转换值来查找最大值。

```typescript
import { maxBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
maxBy(items, x => x.a);
// Returns: { a: 3 }

const numbers = [-1, -2, -3];
maxBy(numbers, x => Math.abs(x));
// Returns: -3 (绝对值最大的元素)
```

通过数组元素访问。

```typescript
import { maxBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
maxBy(arrays, 0); // 第一个元素最大的数组
// Returns: [3, 4]

maxBy(arrays, 1); // 第二个元素最大的数组
// Returns: [0, 5]
```

查找对象特定属性和值匹配的情况。

```typescript
import { maxBy } from 'es-toolkit/compat';

const users = [
  { name: '张三', age: 25, active: true },
  { name: '李四', age: 30, active: false },
  { name: '王五', age: 35, active: true },
];

// active 为 true 的元素中的第一个
maxBy(users, ['active', true]);
// Returns: { name: '张三', age: 25, active: true }

// 用对象指定条件
maxBy(users, { active: true });
// Returns: { name: '张三', age: 25, active: true }
```

空数组返回 undefined。

```typescript
import { maxBy } from 'es-toolkit/compat';

maxBy([], x => x.a);
// Returns: undefined

maxBy(null);
// Returns: undefined

maxBy(undefined);
// Returns: undefined
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `iteratee` (`ValueIteratee<T>`, 可选): 应用于每个元素的函数、属性名或条件。

#### 返回值

(`T | undefined`): 返回符合条件的值最大的元素。如果是空数组则返回 `undefined`。
