# isObjectLike

检查一个值是否是类对象。

如果该值是类对象，则返回 `true`，否则返回 `false`。

这个函数也可以在 TypeScript 中作为类型断言使用，将参数的类型缩小为类对象。

## 签名

```typescript
export function isObjectLike<T>(value: T): value is Extract<T, object>;
```

### 参数

- `value` (`T`): 要检查是否为类对象的值。

### 返回值

(`value is Extract<T, object>`): 如果该值是类对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isObjectLike } from 'es-toolkit/predicate';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
console.log(isObjectLike(value5)); // false
```
