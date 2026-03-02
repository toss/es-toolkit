# isArguments (Lodash 兼容性)

检查值是否为 arguments 对象。

```typescript
const result = isArguments(value);
```

## 用法

### `isArguments(value)`

当您需要检查给定值是否为函数的 arguments 对象时，请使用 `isArguments`。此函数在 TypeScript 中也作为类型守卫工作，将值的类型缩小为 `IArguments`。

```typescript
import { isArguments } from 'es-toolkit/compat';

// 在普通函数中
function normalFunction() {
  return isArguments(arguments); // true
}

// 在严格模式中
function strictFunction() {
  'use strict';
  return isArguments(arguments); // true
}

// 非 arguments 的值
isArguments([1, 2, 3]); // false
isArguments({ 0: 'a', 1: 'b', length: 2 }); // false
isArguments(null); // false
isArguments(undefined); // false

// 实际使用示例
function example() {
  if (isArguments(arguments)) {
    console.log('This is an arguments object');
    console.log('Length:', arguments.length);
  }
}
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值是 arguments 对象则返回 `true`，否则返回 `false`。
