# eq (Lodash 兼容性)

检查两个值是否使用 SameValueZero 比较方式相等。

```typescript
const isEqual = eq(value, other);
```

## 用法

### `eq(value, other)`

当您想要检查两个值是否相等时，请使用 `eq`。与常规的 `===` 比较不同，它在 `NaN` 之间的比较中返回 `true`。

```typescript
import { eq } from 'es-toolkit/compat';

// 基本用法
console.log(eq(1, 1)); // true
console.log(eq(0, -0)); // true (SameValueZero 中 0 和 -0 被视为相等)
console.log(eq(NaN, NaN)); // true
console.log(eq('a', 'a')); // true
console.log(eq('a', 'b')); // false
```

与 `Object.is()` 的不同行为。

```typescript
// 使用 eq
console.log(eq(NaN, NaN)); // true
console.log(eq(0, -0)); // true

// 使用 Object.is (更快)
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false (Object.is 将 0 和 -0 视为不同)

// 使用 ===
console.log(NaN === NaN); // false
console.log(0 === -0); // true
```

#### 参数

- `value` (`any`): 要比较的第一个值。
- `other` (`any`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果两个值相等则返回 `true`，否则返回 `false`。
