# groupBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [groupBy](../../array/groupBy.md)

此 `groupBy` 函数由于处理 `null` 或 `undefined`、对象支持、复杂类型处理等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [groupBy](../../array/groupBy.md)。

:::

根据给定条件将数组或对象的元素分组。

```typescript
const grouped = groupBy(collection, iteratee);
```

## 用法

### `groupBy(collection, iteratee)`

根据给定的条件函数对数组或对象的每个元素进行分组，并返回按组分类的对象。条件可以以各种形式提供，如函数、属性名、部分对象等。

```typescript
import { groupBy } from 'es-toolkit/compat';

// 按函数分组
const array = [6.1, 4.2, 6.3];
const result = groupBy(array, Math.floor);
// result 为 { '4': [4.2], '6': [6.1, 6.3] }

// 按属性名分组
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 30 },
];
const byAge = groupBy(users, 'age');
// byAge 为 { '25': [{ name: 'jane', age: 25 }], '30': [{ name: 'john', age: 30 }, { name: 'bob', age: 30 }] }

// 从对象分组
const obj = { a: 6.1, b: 4.2, c: 6.3 };
const groupedObj = groupBy(obj, Math.floor);
// groupedObj 为 { '4': [4.2], '6': [6.1, 6.3] }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { groupBy } from 'es-toolkit/compat';

groupBy(null, x => x); // {}
groupBy(undefined, x => x); // {}
```

也可以按部分对象或属性-值对进行分组。

```typescript
import { groupBy } from 'es-toolkit/compat';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// 按部分对象分组
const byCategory = groupBy(products, { category: 'fruit' });
// 按属性-值对分组
const byName = groupBy(products, ['name', 'apple']);
```

#### 参数

- `collection` (`ArrayLike<T> | Record<any, T> | null | undefined`): 要分组的数组或对象。
- `iteratee` (`Function | PropertyKey | Array | Object`, 选择): 分组条件。可以是函数、属性名、属性-值对或部分对象。默认值是 `identity` 函数。

#### 返回值

(`Record<string, T[]>`): 返回一个对象，其中每个键是组的条件值，值是属于该组的元素数组。
