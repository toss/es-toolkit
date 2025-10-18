# isObject (Lodash 兼容性)

检查值是否为对象。

```typescript
const result = isObject(value);
```

## 参考

### `isObject(value)`

当您想检查值是否为对象时使用 `isObject`。在 JavaScript 中，数组、函数、对象、正则表达式、Date 等都被视为对象。

```typescript
import { isObject } from 'es-toolkit/compat';

// 普通对象
isObject({});
// 返回: true

// 数组也是对象
isObject([1, 2, 3]);
// 返回: true

// 函数也是对象
isObject(() => {});
// 返回: true

// Date 也是对象
isObject(new Date());
// 返回: true

// null 不是对象
isObject(null);
// 返回: false

// 原始类型不是对象
isObject('string');
// 返回: false

isObject(123);
// 返回: false
```

#### 参数

- `value` (`unknown`): 要检查是否为对象的值。

#### 返回值

(`value is object`): 如果值为对象则返回 `true`，否则返回 `false`。
