# uniqWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [uniqWith](../../array/uniqWith.md)

此 `uniqWith` 函数由于处理 `null` 或 `undefined`、复杂参数类型处理等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [uniqWith](../../array/uniqWith.md)。

:::

使用比较函数去除重复项来创建一个唯一元素的新数组。

```typescript
const result = uniqWith(array, comparator);
```

## 用法

### `uniqWith(array, comparator)`

使用比较函数比较数组的每个元素来去除重复项。当比较函数返回 `true` 时,两个元素被视为相等,仅保留第一次出现的元素。如果未提供比较函数,默认使用浅相等性比较。

```typescript
import { uniqWith } from 'es-toolkit/compat';

// 不使用比较函数(浅相等性比较)
uniqWith([1, 2, 2, 3]);
// 返回: [1, 2, 3]

// 使用自定义比较函数根据奇偶性标准去除重复项
uniqWith([1, 2, 3, 4], (a, b) => a % 2 === b % 2);
// 返回: [1, 2]

// 在对象数组中根据属性去除重复项
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];
uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y);
// 返回: [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { uniqWith } from 'es-toolkit/compat';

uniqWith(null); // []
uniqWith(undefined); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要去除重复项的数组。
- `comparator` (`(a: T, b: T) => boolean`, 可选): 比较两个元素是否相等的函数。如果相等则返回 `true`。默认为浅相等性比较。

#### 返回值

(`T[]`): 返回一个根据比较函数结果去除重复项的新数组。
