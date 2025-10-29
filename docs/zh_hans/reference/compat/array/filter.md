# filter (Lodash 兼容性)

::: warning 请使用 `Array.prototype.filter()`

此 `filter` 函数由于复杂的对象处理、支持各种条件格式等原因而运行缓慢。

请改用更快、更现代的 `Array.prototype.filter()`。

:::

创建一个包含满足给定条件的元素的新数组。

```typescript
const result = filter(collection, predicate);
```

## 参考

### `filter(collection, predicate)`

当您想从数组或对象中筛选出满足特定条件的元素时,使用 `filter`。条件可以以各种格式指定,如函数、部分对象、属性-值对、属性名称等。

```typescript
import { filter } from 'es-toolkit/compat';

// 使用检查函数
const numbers = [1, 2, 3, 4, 5];
filter(numbers, x => x % 2 === 0);
// 返回: [2, 4]

// 使用属性名称
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];
filter(users, 'active');
// 返回: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// 使用部分对象
filter(users, { active: true });
// 返回: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// 使用属性-值对
filter(users, ['active', true]);
// 返回: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
```

对象的操作方式相同,返回满足条件的值的数组。

```typescript
import { filter } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
filter(scores, score => score >= 80);
// 返回: [90, 85]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { filter } from 'es-toolkit/compat';

filter(null, x => x > 0);
// 返回: []

filter(undefined, x => x > 0);
// 返回: []
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 要过滤的数组或对象。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): 过滤条件。可以使用函数、部分对象、属性-值对或属性名称。

#### 返回值

(`T[]`): 返回由满足条件的元素组成的新数组。
