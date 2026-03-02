# findLast (Lodash 兼容性)

::: warning 请使用 `Array.prototype.findLast`

由于处理各种类型和特殊条件,此 `findLast` 函数复杂且运行较慢。

请改用更快、更现代的 `Array.prototype.findLast`。

:::

在数组或对象中查找满足条件的最后一个元素。

```typescript
const lastEven = findLast(array, predicate);
```

## 用法

### `findLast(collection, predicate?, fromIndex?)`

在数组或对象中查找满足给定条件的最后一个元素。从数组末尾开始逆序搜索,并返回满足条件的第一个元素。

```typescript
import { findLast } from 'es-toolkit/compat';

// 使用函数指定条件
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 18 },
];
findLast(users, o => o.age < 40);
// => { user: 'pebbles', age: 18 }

// 使用对象指定条件
findLast(users, { age: 36 });
// => { user: 'barney', age: 36 }

// 使用键值对指定条件
findLast(users, ['age', 18]);
// => { user: 'pebbles', age: 18 }

// 使用属性名指定条件(具有真值的最后一个元素)
findLast(users, 'age');
// => { user: 'fred', age: 40 }
```

也可以指定搜索起始索引。

```typescript
import { findLast } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
findLast(numbers, n => n > 3, 6); // 从索引6开始逆序搜索
// => 4
```

`null` 或 `undefined` 返回空结果。

```typescript
import { findLast } from 'es-toolkit/compat';

findLast(null, x => x > 0); // undefined
findLast(undefined, x => x > 0); // undefined
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 要搜索的数组或对象。
- `predicate` (`ListIterateeCustom<T, boolean>`, 可选): 应用于每个元素的条件。可以使用函数、对象、键值对或属性名。默认为 `identity` 函数。
- `fromIndex` (`number`, 可选): 开始搜索的索引。负值从末尾计算。默认为数组的最后一个索引。

#### 返回值

(`T | undefined`): 返回满足条件的最后一个元素。如果没有元素满足条件,则返回 `undefined`。
