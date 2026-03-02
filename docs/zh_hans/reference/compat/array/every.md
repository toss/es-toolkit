# every (Lodash 兼容性)

::: warning 请使用 `Array.prototype.every()`

此 `every` 函数由于复杂的对象处理、支持各种条件格式等原因而运行缓慢。

请改用更快、更现代的 `Array.prototype.every()`。

:::

检查数组或对象的所有值是否满足给定条件。

```typescript
const result = every(collection, predicate);
```

## 用法

### `every(collection, predicate?)`

当您想检查数组或对象的所有元素是否满足特定条件时,使用 `every`。条件可以以各种格式指定,如函数、部分对象、属性-值对、属性名称等。

```typescript
import { every } from 'es-toolkit/compat';

// 使用检查函数
const numbers = [2, 4, 6, 8];
every(numbers, x => x % 2 === 0);
// 返回: true

// 使用属性名称
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
];
every(users, 'active');
// 返回: true

// 使用部分对象
every(users, { active: true });
// 返回: true

// 使用属性-值对
every(users, ['active', true]);
// 返回: true
```

对象的操作方式相同。

```typescript
import { every } from 'es-toolkit/compat';

const scores = { math: 90, english: 85, science: 92 };
every(scores, score => score >= 80);
// 返回: true
```

`null` 或 `undefined` 被视为空集合并返回 `true`。

```typescript
import { every } from 'es-toolkit/compat';

every(null);
// 返回: true

every(undefined);
// 返回: true
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): 要检查的数组或对象。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 可选): 检查条件。可以使用函数、部分对象、属性-值对或属性名称。默认为 `identity` 函数。

#### 返回值

(`boolean`): 如果所有元素满足条件则返回 `true`,否则返回 `false`。
