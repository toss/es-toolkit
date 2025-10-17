# minBy（Lodash 兼容性）

::: warning 请使用 es-toolkit 的 [minBy](../../array/minBy.md)

这个 `minBy` 函数由于 iteratee 函数处理和类型转换会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [minBy](../../array/minBy.md)。

:::

在满足条件的值中找到最小值元素。

```typescript
const minItem = minBy(array, iteratee);
```

## 参考

### `minBy(array, iteratee)`

在数组中找到通过函数计算后值最小的元素。

```typescript
import { minBy } from 'es-toolkit/compat';

// 对象数组中特定属性最小的元素
const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 },
];

minBy(people, person => person.age);
// Returns: { name: '홍길동', age: 25 }

// 也可以使用属性名
minBy(people, 'age');
// Returns: { name: '홍길동', age: 25 }
```

通过函数转换值来找到最小值。

```typescript
import { minBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
minBy(items, x => x.a);
// Returns: { a: 1 }

const numbers = [-1, -2, -3];
minBy(numbers, x => Math.abs(x));
// Returns: -1 (绝对值最小的元素)
```

通过数组元素访问。

```typescript
import { minBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
minBy(arrays, 0); // 第一个元素最小的数组
// Returns: [0, 5]

minBy(arrays, 1); // 第二个元素最小的数组
// Returns: [1, 2]
```

查找对象的特定属性和值匹配的情况。

```typescript
import { minBy } from 'es-toolkit/compat';

const users = [
  { name: '홍길동', age: 25, active: true },
  { name: '김철수', age: 30, active: false },
  { name: '이영희', age: 35, active: true },
];

// 在 active 为 true 的元素中找到不是第一个的元素
minBy(users, ['active', true]);
// Returns: { name: '김철수', age: 30, active: false }

// 使用对象指定条件
minBy(users, { active: true });
// Returns: { name: '김철수', age: 30, active: false }
```

空数组返回 undefined。

```typescript
import { minBy } from 'es-toolkit/compat';

minBy([], x => x.a);
// Returns: undefined

minBy(null);
// Returns: undefined

minBy(undefined);
// Returns: undefined
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `iteratee` (`ValueIteratee<T>`, 可选): 应用于每个元素的函数、属性名或条件。

#### 返回值

(`T | undefined`): 返回满足条件的值最小的元素。如果是空数组则返回 `undefined`。
