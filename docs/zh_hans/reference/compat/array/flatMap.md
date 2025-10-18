# flatMap (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flatMap`

此 `flatMap` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等而运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [flatMap](../../array/flatMap.md)。

:::

对每个元素应用函数并展平结果。

```typescript
const result = flatMap(collection, iteratee);
```

## 参考

### `flatMap(collection, iteratee)`

对集合的每个元素应用迭代函数并返回展平一层的数组。支持数组、对象和字符串,可以使用各种形式的迭代器。

```typescript
import { flatMap } from 'es-toolkit/compat';

// 对数组应用函数
function duplicate(n) {
  return [n, n];
}
flatMap([1, 2], duplicate);
// 结果: [1, 1, 2, 2]

// 对对象应用函数
const obj = { a: 1, b: 2 };
flatMap(obj, (value, key) => [key, value]);
// 结果: ['a', 1, 'b', 2]

// 使用字符串属性映射
const users = [
  { user: 'barney', hobbies: ['hiking', 'coding'] },
  { user: 'fred', hobbies: ['reading'] },
];
flatMap(users, 'hobbies');
// 结果: ['hiking', 'coding', 'reading']
```

不使用迭代器时将值展平一层。

```typescript
import { flatMap } from 'es-toolkit/compat';

const obj = { a: [1, 2], b: [3, 4] };
flatMap(obj);
// 结果: [1, 2, 3, 4]
```

也可以使用部分对象进行条件映射。

```typescript
import { flatMap } from 'es-toolkit/compat';

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];
flatMap(users, { active: false });
// 结果: [false, true] (active 为 false 的元素的匹配结果)
```

#### 参数

- `collection` (`object | null | undefined`): 要迭代的集合。可以是数组、对象或字符串。
- `iteratee` (`ListIterator | ObjectIterator | string | object`, 可选): 应用于每个元素的迭代器。可以是函数、属性名或部分对象。

#### 返回值

(`any[]`): 返回映射后展平一层的新数组。
