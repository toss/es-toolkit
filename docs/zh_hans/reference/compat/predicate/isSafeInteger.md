# isSafeInteger (Lodash 兼容性)

::: warning 使用 `Number.isSafeInteger`
这个 `isSafeInteger` 函数由于额外的类型检查开销而运行较慢。

请使用更快且现代的 `Number.isSafeInteger`。
:::

检查值是否为安全整数。

```typescript
const result = isSafeInteger(value);
```

## 用法

### `isSafeInteger(value)`

当您想检查给定值是否为安全整数时使用 `isSafeInteger`。安全整数是介于 -(2^53 - 1) 和 (2^53 - 1) 之间的整数，可以在 JavaScript 中精确表示。

```typescript
import { isSafeInteger } from 'es-toolkit/compat';

// 安全整数
isSafeInteger(3); // true
isSafeInteger(-42); // true
isSafeInteger(0); // true
isSafeInteger(Number.MAX_SAFE_INTEGER); // true (9007199254740991)
isSafeInteger(Number.MIN_SAFE_INTEGER); // true (-9007199254740991)

// 不安全的整数
isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
isSafeInteger(9007199254740992); // false

// 非整数值
isSafeInteger(3.14); // false
isSafeInteger('3'); // false
isSafeInteger(1n); // false (BigInt)
isSafeInteger([]); // false
isSafeInteger({}); // false
isSafeInteger(null); // false
isSafeInteger(undefined); // false

// 无穷大和 NaN
isSafeInteger(Infinity); // false
isSafeInteger(-Infinity); // false
isSafeInteger(NaN); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值为安全整数则返回 `true`，否则返回 `false`。
