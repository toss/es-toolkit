# find (Lodash 兼容性)

::: warning 请使用 `Array.prototype.find()`

此 `find` 函数由于复杂的对象处理、支持各种条件格式等原因而运行缓慢。

请改用更快、更现代的 `Array.prototype.find()`。

:::

在数组或对象中查找满足条件的第一个元素。

```typescript
const result = find(collection, predicate, fromIndex);
```

## 用法

### `find(collection, predicate, fromIndex?)`

当您想在数组或对象中查找满足特定条件的第一个元素时,使用 `find`。条件可以以各种格式指定,如函数、部分对象、属性-值对、属性名称等。

```typescript
import { find } from 'es-toolkit/compat';

// 使用检查函数
const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 3);
// 返回: 4

// 使用属性名称
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
];
find(users, 'active');
// 返回: { name: 'Bob', active: true }

// 使用部分对象
find(users, { active: true });
// 返回: { name: 'Bob', active: true }

// 使用属性-值对
find(users, ['name', 'Charlie']);
// 返回: { name: 'Charlie', active: true }
```

可以指定起始索引。

```typescript
import { find } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 2, 2);
// 返回: 3 (从索引 2 开始搜索)
```

对象的操作方式相同。

```typescript
import { find } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
find(scores, score => score >= 80);
// 返回: 90
```

`null` 或 `undefined` 被视为空集合并返回 `undefined`。

```typescript
import { find } from 'es-toolkit/compat';

find(null, x => x > 0);
// 返回: undefined

find(undefined, x => x > 0);
// 返回: undefined
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 要搜索的数组或对象。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): 搜索条件。可以使用函数、部分对象、属性-值对或属性名称。
- `fromIndex` (`number`, 可选): 开始搜索的索引。默认为 `0`。

#### 返回值

(`T | undefined`): 返回满足条件的第一个元素。如果未找到则返回 `undefined`。
