# isSymbol

检查一个值是否是 `symbol`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `symbol`。

## 签名

```typescript
function isSymbol(value: unknown): value is symbol;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is symbol`): 如果值是 `symbol` 则返回 `true`，否则返回 `false`。

### 示例

```typescript
import { isSymbol } from 'es-toolkit/predicate';

isSymbol(Symbol('a')); // true
isSymbol(Symbol.for('a')); // true
isSymbol(Symbol.iterator); // true
isSymbol(Object(Symbol())); // true

isSymbol(null); // false
isSymbol(undefined); // false
isSymbol('123'); // false
isSymbol(false); // false
isSymbol(123n); // false
isSymbol({}); // false
isSymbol([1, 2, 3]); // false
```
