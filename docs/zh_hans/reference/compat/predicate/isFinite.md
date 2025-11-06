# isFinite (Lodash 兼容性)

::: warning 请使用 `Number.isFinite`

这个 `isFinite` 函数由于额外的类型检查开销而性能较慢。

建议使用更快、更现代的 `Number.isFinite`。

:::

检查值是否为有限数字。

```typescript
const result = isFinite(value);
```

## 用法

### `isFinite(value)`

当需要检查给定值是否为有限数字时使用 `isFinite`。此函数在 TypeScript 中也可以作为类型守卫使用，将值的类型缩小为 `number`。

```typescript
import { isFinite } from 'es-toolkit/compat';

// 有限数字
isFinite(100); // true
isFinite(-50); // true
isFinite(3.14); // true
isFinite(0); // true

// 无穷大返回 false
isFinite(Infinity); // false
isFinite(-Infinity); // false

// NaN 也返回 false
isFinite(NaN); // false

// 其他类型也返回 false
isFinite('100'); // false
isFinite([]); // false
isFinite({}); // false
isFinite(null); // false
isFinite(undefined); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值是有限数字则返回 `true`，否则返回 `false`。
