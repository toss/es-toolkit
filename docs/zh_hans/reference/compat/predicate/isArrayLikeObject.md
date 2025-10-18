# isArrayLikeObject (Lodash 兼容性)

检查值是否为非原始值的类数组对象。

```typescript
const result = isArrayLikeObject(value);
```

## 参考

### `isArrayLikeObject(value)`

当您需要检查给定值是否为非原始值的类数组对象时，请使用 `isArrayLikeObject`。数组、arguments 对象、NodeList 等属于此类，但字符串由于是原始值而被排除。

```typescript
import { isArrayLikeObject } from 'es-toolkit/compat';

// 类数组对象（非原始值）
isArrayLikeObject([1, 2, 3]); // true
isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLikeObject({ length: 0 }); // true

// arguments 对象
function example() {
  return isArrayLikeObject(arguments); // true
}

// NodeList 或 HTMLCollection（在浏览器中）
isArrayLikeObject(document.querySelectorAll('div')); // true

// 原始值返回 false（包括字符串）
isArrayLikeObject('abc'); // false
isArrayLikeObject(''); // false
isArrayLikeObject(123); // false
isArrayLikeObject(true); // false

// 其他对象
isArrayLikeObject({}); // false
isArrayLikeObject(null); // false
isArrayLikeObject(undefined); // false
isArrayLikeObject(() => {}); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值是非原始值的类数组对象则返回 `true`，否则返回 `false`。
