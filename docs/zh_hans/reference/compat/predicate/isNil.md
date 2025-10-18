# isNil (Lodash 兼容性)

::: warning 使用 es-toolkit 的 [isNil](../../predicate/isNil.md)
这个 `isNil` 函数由于 Lodash 兼容性的复杂处理而运行较慢。

请使用更快且现代的 es-toolkit 的 [isNil](../../predicate/isNil.md)。
:::

检查值是否为 `null` 或 `undefined`。

```typescript
const result = isNil(value);
```

## 参考

### `isNil(x)`

当您想类型安全地检查值是否为 `null` 或 `undefined` 时使用 `isNil`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isNil } from 'es-toolkit/compat';

// null 和 undefined 返回 true
isNil(null); // true
isNil(undefined); // true

// 所有其他值返回 false
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil([]); // false
isNil({}); // false
isNil('hello'); // false
isNil(42); // false
```

与被认为是假值但不是 `null` 或 `undefined` 的值进行区分。

```typescript
import { isNil } from 'es-toolkit/compat';

// 被认为是假值但不是 null/undefined 的值
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil(NaN); // false

// 只有 null 和 undefined 返回 true
isNil(null); // true
isNil(undefined); // true
```

#### 参数

- `x` (`any`): 要检查是否为 `null` 或 `undefined` 的值。

#### 返回值

(`x is null | undefined`): 如果值为 `null` 或 `undefined` 则返回 `true`，否则返回 `false`。
