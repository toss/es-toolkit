# flatMapDepth (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [flatMap](../../array/flatMap.md)

此 `flatMapDepth` 函数为了 Lodash 兼容性支持各种形式的迭代器和处理 `null` 或 `undefined`,实现较为复杂。主库中的 `flatMap` 函数仅支持简单的函数迭代器,因此运行更快。

请改用更快、更现代的 `es-toolkit` 的 [flatMap](../../array/flatMap.md)。

:::

使用迭代函数转换数组的每个元素并展平到指定深度。

```typescript
const result = flatMapDepth(collection, iteratee, depth);
```

## 参考

### `flatMapDepth(collection, iteratee, depth)`

使用给定函数转换数组或对象的每个元素,然后将结果展平到指定深度并返回新数组。当您想将嵌套的数组结构仅展平到所需深度时很有用。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 转换数组并展平到深度2
flatMapDepth([1, 2], n => [[n, n]], 2);
// => [1, 1, 2, 2]

// 限制为深度1时不会完全展平
flatMapDepth([1, 2], n => [[n, n]], 1);
// => [[1, 1], [2, 2]]

// 从对象提取值并展平
const users = [
  { user: 'barney', hobbies: [['hiking'], ['coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDepth(users, 'hobbies', 2);
// => ['hiking', 'coding', 'reading']
```

此函数支持各种形式的迭代器。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 使用函数转换
flatMapDepth([1, 2, 3], n => [[n, n]], 2);

// 按属性名提取值
const objects = [{ items: [['a'], ['b']] }, { items: [['c']] }];
flatMapDepth(objects, 'items', 2);
// => ['a', 'b', 'c']

// 使用对象部分匹配
const users = [{ active: [[true], [false]] }, { active: [[false]] }];
flatMapDepth(users, { active: [[false]] }, 2);
// => [true, true]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

flatMapDepth(null, n => [n], 1); // => []
flatMapDepth(undefined, n => [n], 1); // => []
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, any> | Record<number, any> | object | null | undefined`): 要迭代的数组或对象。
- `iteratee` (`((value: T, index: number, collection: any) => any) | string | object`, 可选): 对每个元素执行的转换函数或属性名。默认为 `identity`。
- `depth` (`number`, 可选): 要展平的最大深度。默认为 `1`。

#### 返回值

(`T[]`): 返回使用迭代器转换后展平到指定深度的新数组。
