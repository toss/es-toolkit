# isLength

检查值是否为有效的数组长度。

```typescript
const result = isLength(value);
```

## 用法

### `isLength(value)`

当您想确认某个值是否为有效的数组长度时，请使用 `isLength`。有效的长度必须是大于等于 0 且小于等于 `Number.MAX_SAFE_INTEGER` 的整数。

```typescript
import { isLength } from 'es-toolkit/predicate';

// 有效的长度
console.log(isLength(0)); // true
console.log(isLength(42)); // true
console.log(isLength(Number.MAX_SAFE_INTEGER)); // true

// 无效的长度
console.log(isLength(-1)); // false (负数)
console.log(isLength(1.5)); // false (小数)
console.log(isLength(Number.MAX_SAFE_INTEGER + 1)); // false (不安全的整数)
console.log(isLength('42')); // false (字符串)
console.log(isLength(null)); // false (null)
```

在 TypeScript 中也可以用作类型守卫。

```typescript
function processLength(value: unknown) {
  if (isLength(value)) {
    // 现在 value 类型被缩小为 number
    console.log(value.toFixed(2));
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为有效长度的值。

#### 返回值

(`value is number`): 如果值为有效长度则返回 `true`，否则返回 `false`。
