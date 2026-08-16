# isArrayLike (Lodash 兼容性)

检查值是否为类数组对象。

```typescript
const result = isArrayLike(value);
```

## 用法

### `isArrayLike(value)`

当您需要检查给定值是否为类数组对象时，请使用 `isArrayLike`。数组、字符串、arguments 对象、NodeList 等都属于类数组对象。

```typescript
import { isArrayLike } from 'es-toolkit/compat';

// 数组和字符串
isArrayLike([1, 2, 3]); // true
isArrayLike('abc'); // true
isArrayLike(''); // true

// 类数组对象
isArrayLike({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLike({ length: 0 }); // true

// arguments 对象
function example() {
  return isArrayLike(arguments); // true
}

// 非数组对象
isArrayLike({}); // false
isArrayLike({ length: 'invalid' }); // false
isArrayLike(null); // false
isArrayLike(undefined); // false
isArrayLike(() => {}); // false
isArrayLike(123); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值是类数组对象则返回 `true`，否则返回 `false`。
