# xorWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [xorWith](../../array/xorWith.md)

此 `xorWith` 函数由于处理 `null` 或 `undefined`、复杂的重复计算逻辑等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [xorWith](../../array/xorWith.md)。

:::

使用比较函数创建一个由恰好存在于多个数组中的一个数组中的元素组成的新数组。

```typescript
const result = xorWith(...arrays, comparator);
```

## 用法

### `xorWith(...arrays, comparator)`

使用比较函数计算多个数组的对称差集。当比较函数返回 `true` 时,两个元素被视为相等,并返回恰好存在于数组中的一个数组中的元素。这在处理复杂对象或需要自定义比较逻辑时很有用。

```typescript
import { xorWith } from 'es-toolkit/compat';

// 简单数字比较
xorWith([1, 2], [2, 3], (a, b) => a === b);
// 返回: [1, 3]

// 比较对象属性
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];
xorWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// 返回: [{ x: 2, y: 1 }, { x: 1, y: 1 }]

// 三个数组的对称差集
xorWith([1], [2], [3], (a, b) => a === b);
// 返回: [1, 2, 3]

// 按字符串长度比较
xorWith(['hello'], ['world', 'hi'], (a, b) => a.length === b.length);
// 返回: ['hi']
```

如果未提供比较函数,默认使用浅相等性比较。

```typescript
import { xorWith } from 'es-toolkit/compat';

xorWith([1, 2], [2, 3]);
// 返回: [1, 3]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>`): 要计算对称差集的数组和末尾的比较函数。比较函数应在两个元素相等时返回 `true`。

#### 返回值

(`T[]`): 返回一个根据比较函数结果由恰好存在于数组中的一个数组中的元素组成的新数组。
