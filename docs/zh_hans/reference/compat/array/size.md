# size（Lodash 兼容性）

::: warning 使用 `.length` 属性

此 `size` 函数由于 `null`、`undefined` 处理和多种类型支持而运行复杂。

请使用更快、更现代的 `.length` 属性或 `Object.keys().length`。

:::

返回数组、字符串、对象的大小。

```typescript
const length = size(collection);
```

## 用法

### `size(collection)`

当需要检查数组、字符串、对象、Map、Set 的大小时，使用 `size`。它为各种类型的集合提供一致的大小信息。

```typescript
import { size } from 'es-toolkit/compat';

// 数组的元素个数
size([1, 2, 3]);
// 返回 3

// 字符串的字符个数
size('hello');
// 返回 5

// 对象的可枚举属性个数
size({ a: 1, b: 2, c: 3 });
// 返回 3

// Map 的元素个数
size(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// 返回 2

// Set 的元素个数
size(new Set([1, 2, 3]));
// 返回 3
```

`null` 或 `undefined` 返回 0。

```typescript
import { size } from 'es-toolkit/compat';

size(null); // 0
size(undefined); // 0
size({}); // 0
size([]); // 0
```

#### 参数

- `collection` (`object | string | null | undefined`)：要检查大小的数组、字符串、对象、Map、Set。

#### 返回值

(`number`)：返回集合的大小。如果是 `null` 或 `undefined`，则返回 0。
