# flattenDeep (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flattenDeep`

此 `flattenDeep` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数格式等而运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [flattenDeep](../../array/flattenDeep.md)。

:::

完全展平数组。

```typescript
const result = flattenDeep(array);
```

## 用法

### `flattenDeep(value)`

在所有深度递归展平嵌套数组。移除所有嵌套级别,返回完全展平的一维数组。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

// 完全展平深层嵌套数组
flattenDeep([1, [2, [3, [4]], 5]]);
// 结果: [1, 2, 3, 4, 5]

// 完全展平复杂嵌套结构
flattenDeep([1, [2, [3, [[[[4]]]]], 5]]);
// 结果: [1, 2, 3, 4, 5]

// 支持混合类型
flattenDeep(['a', ['b', ['c', [['d']]]]]);
// 结果: ['a', 'b', 'c', 'd']
```

空数组、null 或 undefined 返回空数组。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep(null); // []
flattenDeep(undefined); // []
flattenDeep([]); // []
```

已经展平的数组按原样复制。

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep([1, 2, 3, 4, 5]);
// 结果: [1, 2, 3, 4, 5]
```

#### 参数

- `value` (`ListOfRecursiveArraysOrValues<T> | null | undefined`): 要完全展平的数组。

#### 返回值

(`Array<T>`): 返回移除所有嵌套的完全展平的新数组。
