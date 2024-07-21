# isLength

检查给定的值是否是一个有效的长度。

该函数测试提供的值是否为 `number` 类型，是非负整数，并且小于或等于 JavaScript 的最大安全整数 (`Number.MAX_SAFE_INTEGER`)。如果该值是一个有效的长度，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型预测器，将参数的类型缩小为有效的长度 (`number`)。

## 签名

```typescript
function isLength(value: unknown): value is number;
```

### 参数

- `value` (`unknown`): 要检查是否为有效长度的值。

### 返回值

(`value is number`): 如果值是有效长度，则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isLength } from 'es-toolkit/predicate';

const value1 = 0;
const value2 = 42;
const value3 = -1;
const value4 = 1.5;
const value5 = Number.MAX_SAFE_INTEGER;
const value6 = Number.MAX_SAFE_INTEGER + 1;

console.log(isLength(value1)); // true
console.log(isLength(value2)); // true
console.log(isLength(value3)); // false
console.log(isLength(value4)); // false
console.log(isLength(value5)); // true
console.log(isLength(value6)); // false
```
