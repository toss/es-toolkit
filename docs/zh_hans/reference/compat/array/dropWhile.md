# dropWhile (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `dropWhile`

此 `dropWhile` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等原因而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [`dropWhile`](../../array/dropWhile.md)。

:::

根据条件函数从数组的开头删除元素。

```typescript
const result = dropWhile(array, predicate);
```

## 用法

### `dropWhile(array, predicate)`

当您想从数组的开头连续删除满足特定条件的元素时,使用 `dropWhile`。当条件函数返回 `false` 时停止删除。

```typescript
import { dropWhile } from 'es-toolkit/compat';

// 使用函数作为条件。
dropWhile([1, 2, 3, 4, 5], n => n < 3);
// 返回: [3, 4, 5]

// 使用对象模式进行匹配。
const users = [
  { name: 'alice', active: false },
  { name: 'bob', active: false },
  { name: 'charlie', active: true },
];

dropWhile(users, { active: false });
// 返回: [{ name: 'charlie', active: true }]

// 以数组形式指定属性和值。
dropWhile(users, ['active', false]);
// 返回: [{ name: 'charlie', active: true }]

// 通过属性名检查条件。
const items = [{ visible: false }, { visible: false }, { visible: true }];

dropWhile(items, 'visible');
// 返回: [{ visible: false }, { visible: false }, { visible: true }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { dropWhile } from 'es-toolkit/compat';

dropWhile(null, x => x > 0); // []
dropWhile(undefined, x => x > 0); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要删除元素的数组。
- `predicate` (`ListIteratee<T>`, 可选): 应用于每个元素的条件函数。可以接受函数、对象模式、数组模式或属性名。默认为 `identity`。

#### 返回值

(`T[]`): 返回从第一个不满足条件的元素开始的新数组。
