# takeRightWhile (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [takeRightWhile](../../array/takeRightWhile.md)

这个 `takeRightWhile` 函数由于处理 `null` 或 `undefined` 等原因运行较慢。

请使用更快且现代的 `es-toolkit` 的 [takeRightWhile](../../array/takeRightWhile.md) 代替。

:::

在条件满足时从数组末尾获取元素。

```typescript
const result = takeRightWhile(array, predicate);
```

## 参考

### `takeRightWhile(array, predicate)`

当您想要从数组末尾开始在条件满足时获取元素来创建新数组时,使用 `takeRightWhile`。当条件评估为 false 时停止。

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

// 使用函数条件
const numbers = [1, 2, 3, 4, 5];
takeRightWhile(numbers, x => x > 3);
// Returns: [4, 5]

// 使用对象属性条件
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

takeRightWhile(users, o => !o.active);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// 使用部分对象进行条件匹配
takeRightWhile(users, { active: false });
// Returns: [{ user: 'pebbles', active: false }]

// 使用属性-值数组进行条件匹配
takeRightWhile(users, ['active', false]);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// 使用属性名检查真值
const items = [{ active: false }, { active: true }, { active: true }];
takeRightWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

takeRightWhile(null, x => x > 0); // []
takeRightWhile(undefined, x => x > 0); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要处理的数组。
- `predicate` (`ListIteratee<T>`, 可选): 对每个元素执行的条件。可以是函数、部分对象、属性-值数组或属性名。默认值为恒等函数。

#### 返回值

(`T[]`): 返回在条件满足时从数组末尾获取的元素的新数组。
