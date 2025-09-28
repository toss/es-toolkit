# isString (Lodash 兼容性)

::: warning 使用 `typeof` 运算符
这个 `isString` 函数由于 String 对象包装器处理而变得复杂。

请使用更简单且现代的 `typeof value === 'string'`。
:::

检查值是否为字符串。

```typescript
const result = isString(value);
```

## 参考

### `isString(value)`

当您想类型安全地检查值是否为字符串时使用 `isString`。检查原始字符串和 String 对象包装器。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isString } from 'es-toolkit/compat';

// 原始字符串
isString('hello'); // true
isString(''); // true
isString('123'); // true

// String 对象包装器
isString(new String('hello')); // true
isString(new String('')); // true

// 其他类型返回 false
isString(123); // false
isString(true); // false
isString(null); // false
isString(undefined); // false
isString({}); // false
isString([]); // false
isString(Symbol('test')); // false
```

与看起来类似字符串的其他类型进行区分。

```typescript
import { isString } from 'es-toolkit/compat';

// 字符串 vs 数字
isString('123'); // true
isString(123); // false

// 字符串 vs 布尔值
isString('true'); // true
isString(true); // false

// 字符串 vs null/undefined
isString('null'); // true
isString(null); // false
isString('undefined'); // true
isString(undefined); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为字符串的值。

#### 返回值

(`value is string`): 如果值为字符串则返回 `true`，否则返回 `false`。
