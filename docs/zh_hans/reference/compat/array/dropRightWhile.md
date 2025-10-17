# dropRightWhile (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `dropRightWhile`

此 `dropRightWhile` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等原因而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [`dropRightWhile`](../../array/dropRightWhile.md)。

:::

根据条件函数从数组的末尾删除元素。

```typescript
const result = dropRightWhile(array, predicate);
```

## 参考

### `dropRightWhile(array, predicate)`

当您想从数组的末尾连续删除满足特定条件的元素时,使用 `dropRightWhile`。当条件函数返回 `false` 时停止删除。

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

// 使用函数作为条件。
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

dropRightWhile(users, user => !user.active);
// 返回: [{ user: 'barney', active: true }]

// 使用对象模式进行匹配。
dropRightWhile(users, { user: 'pebbles', active: false });
// 返回: [{ user: 'barney', active: true }, { user: 'fred', active: false }]

// 以数组形式指定属性和值。
dropRightWhile(users, ['active', false]);
// 返回: [{ user: 'barney', active: true }]

// 通过属性名检查条件。
dropRightWhile(users, 'active');
// 返回: [{ user: 'barney', active: true }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

dropRightWhile(null, x => x > 0); // []
dropRightWhile(undefined, x => x > 0); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要删除元素的数组。
- `predicate` (`ListIteratee<T>`, 可选): 应用于每个元素的条件函数。可以接受函数、对象模式、数组模式或属性名。

#### 返回值

(`T[]`): 返回从第一个不满足条件的元素开始的新数组。
