# isNaN (Lodash 兼容性)

::: warning 使用 `Number.isNaN`
这个 `isNaN` 函数由于额外的函数调用而运行较慢。

请使用更快且现代的 `Number.isNaN`。
:::

检查值是否为 `NaN`。

```typescript
const result = isNaN(value);
```

## 参考

### `isNaN(value)`

当您想检查值是否为 `NaN` 时使用 `isNaN`。

```typescript
import { isNaN } from 'es-toolkit/compat';

// NaN 检查
isNaN(NaN);
// 返回: true

isNaN(Number.NaN);
// 返回: true

// 其他值
isNaN(undefined);
// 返回: false

isNaN(null);
// 返回: false

isNaN(0);
// 返回: false

isNaN('NaN');
// 返回: false
```

#### 参数

- `value` (`unknown`): 要检查是否为 NaN 的值。

#### 返回值

(`boolean`): 如果值为 NaN 则返回 `true`，否则返回 `false`。
