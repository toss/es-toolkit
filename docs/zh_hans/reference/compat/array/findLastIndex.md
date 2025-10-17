# findLastIndex (Lodash 兼容性)

::: warning 使用 `Array.prototype.findLastIndex`

此 `findLastIndex` 函数由于处理 `null` 或 `undefined`、部分对象匹配、属性名匹配等附加功能而运行较慢。

请使用更快、更现代的 `Array.prototype.findLastIndex`。

:::

查找数组中满足条件的最后一个元素的索引。

```typescript
const lastIndex = findLastIndex(array, predicate, fromIndex);
```

## 参考

### `findLastIndex(array, predicate, fromIndex)`

当您想要从数组末尾开始查找满足给定条件的第一个元素的索引时,使用 `findLastIndex`。如果没有元素满足条件,则返回 `-1`。

此函数可以通过多种方式指定条件。当您传递函数时,它会对每个元素执行该函数。当您传递部分对象时,它会检查元素是否具有这些属性。当您传递数组格式的键值对时,它会检查特定属性是否与给定值匹配。当您传递字符串时,它会检查该属性是否值为真。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

// 使用函数指定条件
findLastIndex(users, o => o.user === 'pebbles');
// Returns: 2

// 使用部分对象查找匹配的元素
findLastIndex(users, { user: 'barney', active: true });
// Returns: 0

// 使用属性值对查找匹配的元素
findLastIndex(users, ['active', false]);
// Returns: 2

// 使用属性名查找具有真值的元素
findLastIndex(users, 'active');
// Returns: 0
```

也可以指定搜索的起始位置。如果 `fromIndex` 为负数,则从数组末尾开始计算。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// 从索引3开始逆向搜索
findLastIndex(numbers, n => n < 4, 2);
// Returns: 2

// 如果使用负索引,则从末尾开始计算
findLastIndex(numbers, n => n > 2, -2);
// Returns: 3
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { findLastIndex } from 'es-toolkit/compat';

findLastIndex(null, n => n > 0); // -1
findLastIndex(undefined, n => n > 0); // -1
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 可选): 测试每个元素的条件。可以是函数、部分对象、属性值对或属性名。默认为恒等函数。
- `fromIndex` (`number`, 可选): 开始搜索的索引。如果为负数,则从数组末尾开始计算。默认为 `array.length - 1`。

#### 返回值

(`number`): 返回满足条件的最后一个元素的索引。如果没有元素满足条件,则返回 `-1`。
