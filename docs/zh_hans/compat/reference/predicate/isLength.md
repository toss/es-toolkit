# isLength (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isLength](../../predicate/isLength.md)
这个 `isLength` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isLength](../../predicate/isLength.md)。
:::

检查值是否为有效长度。

```typescript
const result = isLength(value);
```

## 用法

### `isLength(value)`

当需要检查值是否为有效长度时使用 `isLength`。有效长度必须是数字类型、非负整数，且不超过 JavaScript 的最大安全整数（`Number.MAX_SAFE_INTEGER`）。在 TypeScript 中它也可以作为类型守卫使用。

```typescript
import { isLength } from 'es-toolkit/compat';

// 有效长度
isLength(0); // true
isLength(42); // true
isLength(100); // true
isLength(Number.MAX_SAFE_INTEGER); // true

// 无效长度
isLength(-1); // false (负数)
isLength(1.5); // false (非整数)
isLength(Number.MAX_SAFE_INTEGER + 1); // false (超出安全范围)
isLength('3'); // false (字符串)
isLength(null); // false
isLength(undefined); // false
isLength({}); // false
isLength([]); // false
```

在验证数组或字符串的 length 属性是否有效时很有用。

```typescript
import { isLength } from 'es-toolkit/compat';

function validateArrayLength(arr: any[]) {
  if (isLength(arr.length)) {
    console.log(`数组长度 ${arr.length} 是有效的`);
    return true;
  }
  return false;
}

validateArrayLength([1, 2, 3]); // "数组长度 3 是有效的"
```

#### 参数

- `value` (`any`): 要检查是否为有效长度的值。

#### 返回值

(`boolean`): 如果值是有效长度则返回 `true`，否则返回 `false`。
