# isFunction

检查 `value` 是否是一个函数。

如果 `value` 是一个函数，则返回 `true`，否则返回 `false`。

这个函数也可以作为 TypeScript 中的类型断言，将参数的类型缩小到函数类型。

## 签名

```typescript
function isFunction(value: unknown): value is (...args: never[]) => unknown;
```

### 参数

- `value` (`unknown`): 要检查是否为函数的值。

### 返回值

(`value is (...args: never[]) => unknown`): 如果值是一个函数则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isFunction } from 'es-toolkit/predicate';

console.log(isFunction(Array.prototype.slice)); // true
console.log(isFunction(async function () {})); // true
console.log(isFunction(function* () {})); // true
console.log(isFunction(Proxy)); // true
console.log(isFunction(Int8Array)); // true
```
