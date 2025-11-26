# isError

检查给定值是否为 `Error` 对象。

```typescript
const result = isError(value);
```

## 用法

### `isError(value)`

当您想确认某个值是否为 `Error` 对象时，请使用 `isError`。在 TypeScript 中作为类型守卫使用，可以将值的类型缩小为 `Error`。在 try-catch 块或 API 响应处理时特别有用。

```typescript
import { isError } from 'es-toolkit/predicate';

// Error 对象确认
isError(new Error('Something went wrong')); // true
isError(new TypeError('Type error')); // true

// 与其他类型区分
isError('error'); // false
isError({ name: 'Error', message: 'Custom error' }); // false
```

在 TypeScript 中作为类型守卫使用时，值的类型会被缩小。

```typescript
function handleError(value: unknown) {
  if (isError(value)) {
    // value 类型被缩小为 Error
    console.log(`发生错误：${value.message}`);
    return value.name;
  }
  return '不是错误';
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 `Error` 对象的值。

#### 返回值

(`boolean`): 如果值为 `Error` 对象则返回 `true`，否则返回 `false`。
