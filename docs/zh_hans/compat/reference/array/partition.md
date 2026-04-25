# partition (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [partition](../../array/partition.md)

由于需要处理 `null` 或 `undefined` 和各种条件类型,这个 `partition` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [partition](../../array/partition.md)。

:::

根据条件将集合的元素分成两组。

```typescript
const [truthy, falsy] = partition(collection, predicate);
```

## 用法

### `partition(collection, predicate)`

根据给定的条件函数将数组或对象的元素分成两组。第一组包含条件为真的元素,第二组包含条件为假的元素。

```typescript
import { partition } from 'es-toolkit/compat';

// 将数字数组分成偶数和奇数
partition([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
// => [[2, 4, 6], [1, 3, 5]]

// 使用属性名称指定条件
const users = [
  { name: 'john', active: true },
  { name: 'jane', active: false },
  { name: 'bob', active: true },
];

partition(users, 'active');
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// 使用对象条件过滤
partition(users, { active: true });
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// 使用数组条件过滤
partition(users, ['name', 'john']);
// => [
//   [{ name: 'john', active: true }],
//   [{ name: 'jane', active: false }, { name: 'bob', active: true }]
// ]
```

对于对象,分割值。

```typescript
import { partition } from 'es-toolkit/compat';

const obj = {
  a: { score: 90 },
  b: { score: 40 },
  c: { score: 80 },
};

partition(obj, item => item.score >= 80);
// => [[{ score: 90 }, { score: 80 }], [{ score: 40 }]]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { partition } from 'es-toolkit/compat';

partition(null, x => x > 0); // [[], []]
partition(undefined, 'active'); // [[], []]
```

#### 参数

- `collection` (`ArrayLike<T> | T | null | undefined`): 要分割的数组或对象。
- `predicate` (`((value: T) => unknown) | Partial<T> | [PropertyKey, any] | PropertyKey`, 可选): 测试每个元素的条件。可以是函数、部分对象、属性-值数组或属性名称。默认为 `identity`。

#### 返回值

(`[T[], T[]]`): 返回一个数组,包含满足条件的元素数组和不满足条件的元素数组。
