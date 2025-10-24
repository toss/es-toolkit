# orderBy (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 [orderBy](../../array/orderBy.md)

由于需要处理 `null` 或 `undefined`、复杂路径导航和各种排序条件,这个 `orderBy` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [orderBy](../../array/orderBy.md)。

:::

按多个条件对集合的元素进行排序。

```typescript
const result = orderBy(collection, criteria, orders);
```

## 参考

### `orderBy(collection, criteria, orders)`

根据指定的条件和排序顺序对数组或对象的元素进行排序。您可以使用多个条件,并为每个条件指定升序 (`'asc'`) 或降序 (`'desc'`) 排序。

```typescript
import { orderBy } from 'es-toolkit/compat';

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
];

// 按名称升序、年龄降序排序
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// => [
//   { name: 'barney', age: 36 },
//   { name: 'barney', age: 34 },
//   { name: 'fred', age: 48 },
//   { name: 'fred', age: 40 }
// ]

// 使用函数指定排序条件
orderBy(users, [user => user.name, user => user.age], ['asc', 'desc']);
// => 与上面相同的结果

// 按单个条件排序
orderBy(users, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'fred', age: 40 }, ...]
```

对于对象,对值进行排序。

```typescript
import { orderBy } from 'es-toolkit/compat';

const obj = {
  a: { name: 'fred', age: 48 },
  b: { name: 'barney', age: 34 },
};

orderBy(obj, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { orderBy } from 'es-toolkit/compat';

orderBy(null, 'name'); // []
orderBy(undefined, 'age'); // []
```

#### 参数

- `collection` (`ArrayLike<T> | object | null | undefined`): 要排序的数组或对象。
- `criteria` (`Criterion<T> | Array<Criterion<T>>`, 可选): 排序条件。可以使用属性名称、属性路径、函数等。默认为 `[null]`。
- `orders` (`unknown | unknown[]`, 可选): 每个条件的排序顺序。可以使用 `'asc'`(升序)、`'desc'`(降序)、`true`(升序)、`false`(降序)。默认为 `[]`。

#### 返回值

(`T[]`): 返回一个新的已排序数组。
