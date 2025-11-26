# isArray (Lodash 兼容性)

::: warning 请使用 `Array.isArray`

此 `isArray` 函数由于额外的函数调用而运行较慢。

请改用更快的现代化 `Array.isArray`。

:::

检查值是否为数组。

```typescript
const result = isArray(value);
```

## 用法

### `isArray(value)`

当您想要检查值是否为数组时，请使用 `isArray`。此函数也可以在 TypeScript 中用作类型守卫。

```typescript
import { isArray } from 'es-toolkit/compat';

// 检查数组
isArray([1, 2, 3]);
// Returns: true

isArray('abc');
// Returns: false

isArray(() => {});
// Returns: false

// 与对象区分
isArray({ 0: 'a', 1: 'b', length: 2 });
// Returns: false

isArray(null);
// Returns: false
```

#### 参数

- `value` (`unknown`): 要检查是否为数组的值。

#### 返回值

(`boolean`): 如果值是数组则返回 `true`，否则返回 `false`。
