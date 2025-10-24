# sortBy (Lodash 兼容性)

::: warning 请使用 `Array.prototype.sort` 方法

这个 `sortBy` 函数由于处理各种类型的条件和对象支持而表现复杂。

请使用更快、更现代的 `Array.prototype.sort` 方法。

:::

根据多个条件按升序对数组进行排序。

```typescript
const sorted = sortBy(collection, ...iteratees);
```

## 参考

### `sortBy(collection, ...iteratees)`

使用 `sortBy` 来使用多个条件按升序对数组或对象进行排序。它对每个元素执行排序条件函数,并根据结果值进行排序。

```typescript
import { sortBy } from 'es-toolkit/compat';

// 按名称对用户进行排序。
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

sortBy(users, ['user']);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]

// 使用函数进行排序。
sortBy(users, [
  function (o) {
    return o.user;
  },
]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```

您也可以同时使用多个条件。

```typescript
import { sortBy } from 'es-toolkit/compat';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

// 首先按名称排序,然后按年龄排序。
sortBy(users, ['user', item => item.age]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]
```

`null` 和 `undefined` 被视为空数组。

```typescript
import { sortBy } from 'es-toolkit/compat';

sortBy(null, ['key']); // []
sortBy(undefined, ['key']); // []
```

#### 参数

- `collection` (`ArrayLike<T> | object | null | undefined`): 要排序的数组或对象。
- `...iteratees` (`Array<Many<ListIteratee<T> | ObjectIteratee<T>>>`): 确定排序条件的函数或属性名称。

#### 返回值

(`T[]`): 返回按升序排序的新数组。
