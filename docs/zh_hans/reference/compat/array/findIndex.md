# findIndex（Lodash 兼容性）

::: warning 使用 `Array.prototype.findIndex`

此 `findIndex` 函数由于支持各种条件格式处理和 `fromIndex` 处理等附加功能而运行较慢。

请使用更快、更现代的 `Array.prototype.findIndex`。

:::

查找数组中满足条件的第一个元素的索引。

```typescript
const index = findIndex(arr, doesMatch, fromIndex);
```

## 用法

### `findIndex(arr, doesMatch, fromIndex)`

当您想要查找数组中满足特定条件的第一个元素的位置时,使用 `findIndex`。您可以通过多种方式指定条件。如果没有元素满足条件,则返回 `-1`。

当您将条件指定为函数时,它会对每个元素执行该函数,并返回第一个返回 true 的元素的索引。

```typescript
import { findIndex } from 'es-toolkit/compat';

const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true },
  { id: 3, name: 'Charlie', active: true },
];

// 使用函数指定条件
findIndex(users, user => user.active);
// Returns: 1
```

当您将条件指定为部分对象时,它会返回第一个匹配这些属性的元素的索引。

```typescript
import { findIndex } from 'es-toolkit/compat';

// 使用部分对象指定条件
findIndex(users, { name: 'Bob', active: true });
// Returns: 1
```

当您将条件指定为属性名和值的数组时,它会返回第一个该属性与该值匹配的元素的索引。

```typescript
import { findIndex } from 'es-toolkit/compat';

// 使用 [属性, 值] 数组指定条件
findIndex(users, ['active', true]);
// Returns: 1
```

当您只指定属性名时,它会返回第一个该属性值为真的元素的索引。

```typescript
import { findIndex } from 'es-toolkit/compat';

// 使用属性名指定条件
findIndex(users, 'active');
// Returns: 1
```

当您指定 `fromIndex` 时,搜索将从该索引开始。负值从数组末尾开始计算。

```typescript
import { findIndex } from 'es-toolkit/compat';

// 从索引 2 开始搜索
findIndex(users, user => user.active, 2);
// Returns: 2

// 从倒数第二个元素开始搜索
findIndex(users, user => user.active, -2);
// Returns: 1
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { findIndex } from 'es-toolkit/compat';

findIndex(null, user => user.active); // -1
findIndex(undefined, 'active'); // -1
```

#### 参数

- `arr` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `doesMatch` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 可选): 匹配条件。可以是函数、部分对象、键值对或属性名。
- `fromIndex` (`number`, 可选): 开始搜索的索引。默认为 `0`。

#### 返回值

(`number`): 返回满足条件的第一个元素的索引。如果没有元素匹配,则返回 `-1`。
