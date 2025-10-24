# isObjectLike (Lodash 兼容性)

检查值是否类似对象。

```typescript
const result = isObjectLike(value);
```

## 参考

### `isObjectLike(value)`

当您想检查给定值是否为类似对象的值时使用 `isObjectLike`。类似对象的值是 `typeof` 运算符的结果为 `'object'` 且不为 `null` 的值。

```typescript
import { isObjectLike } from 'es-toolkit/compat';

// 类似对象的值
isObjectLike({ a: 1 }); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(new Date()); // true
isObjectLike(/regex/); // true
isObjectLike(new Map()); // true
isObjectLike(new Set()); // true

// 不类似对象的值
isObjectLike('abc'); // false
isObjectLike(123); // false
isObjectLike(true); // false
isObjectLike(() => {}); // false
isObjectLike(Symbol('sym')); // false

// 特殊情况
isObjectLike(null); // false (null 的 typeof 为 'object' 但不是类似对象)
isObjectLike(undefined); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值类似对象则返回 `true`，否则返回 `false`。
