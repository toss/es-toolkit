# countBy（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 `countBy`

此 `countBy` 函数由于复杂的转换函数处理和类型转换而运行较慢。

请使用 `es-toolkit` 中更快、更现代的 [countBy](../../array/countBy.md)。

:::

根据条件对数组或对象的元素进行分类并计算每个分类的数量。

```typescript
const counts = countBy(collection, iteratee);
```

## 参考

### `countBy(collection, iteratee?)`

当你想要按某个标准对数组或对象的每个元素进行分组,并计算每个组中有多少个元素时,使用 `countBy`。迭代函数返回的值将成为键,该键对应的元素数量将成为值。

```typescript
import { countBy } from 'es-toolkit/compat';

// 按向下取整对数字分组
countBy([6.1, 4.2, 6.3], Math.floor);
// Returns: { '4': 1, '6': 2 }

// 按长度对字符串分组
countBy(['one', 'two', 'three'], 'length');
// Returns: { '3': 2, '5': 1 }

// 按年龄段对用户分组
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
  { name: 'Charlie', age: 25 },
];
countBy(users, user => Math.floor(user.age / 10) * 10);
// Returns: { '20': 2, '30': 1 }
```

也可以处理对象。

```typescript
import { countBy } from 'es-toolkit/compat';

// 按类型对对象的值进行分类
const obj = { a: 1, b: 'string', c: 2, d: 'text' };
countBy(obj, value => typeof value);
// Returns: { 'number': 2, 'string': 2 }
```

不使用迭代函数时,会按值本身分组。

```typescript
import { countBy } from 'es-toolkit/compat';

// 按值本身分组
countBy([1, 2, 1, 3, 2, 1]);
// Returns: { '1': 3, '2': 2, '3': 1 }

// 按布尔值分组
countBy([true, false, true, true]);
// Returns: { 'true': 3, 'false': 1 }
```

`null` 或 `undefined` 集合返回空对象。

```typescript
import { countBy } from 'es-toolkit/compat';

countBy(null);
// Returns: {}

countBy(undefined);
// Returns: {}
```

#### 参数

- `collection` (`ArrayLike<T> | object | null | undefined`): 要处理的数组或对象。
- `iteratee` (`ValueIteratee<T>`, 可选): 决定每个元素分组标准的函数。可以使用函数、属性名或部分对象。

#### 返回值

(`Record<string, number>`): 返回包含每个组的键和该组元素数量的对象。
