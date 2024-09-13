# isPrimitive

检查一个值是否是 JavaScript 的原始类型。

JavaScript 的原始类型包括 null、undefined、字符串、数字、布尔值、Symbol 和 BigInt。

## 签名

```typescript
function isPrimitive(value: unknown): value is null | undefined | string | number | boolean | symbol | bigint;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回

(`value is null | undefined | string | number | boolean | symbol | bigint`): 如果值是原始类型则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive('123'); // true
isPrimitive(false); // true
isPrimitive(true); // true
isPrimitive(Symbol('a')); // true
isPrimitive(123n); // true
isPrimitive({}); // false
isPrimitive(new Date()); // false
isPrimitive(new Map()); // false
isPrimitive(new Set()); // false
isPrimitive([1, 2, 3]); // false
```
