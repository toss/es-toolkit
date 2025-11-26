# isSymbol (Lodash 兼容性)

::: warning 使用 `typeof` 运算符
这个 `isSymbol` 函数由于 Symbol 对象包装器处理而变得复杂。

请使用更简单且现代的 `typeof value === 'symbol'`。
:::

检查值是否为符号(symbol)。

```typescript
const result = isSymbol(value);
```

## 用法

### `isSymbol(value)`

当您想类型安全地检查值是否为符号时使用 `isSymbol`。检查原始符号和 Symbol 对象包装器。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isSymbol } from 'es-toolkit/compat';

// 原始符号
isSymbol(Symbol('test')); // true
isSymbol(Symbol.for('global')); // true
isSymbol(Symbol.iterator); // true

// Symbol 对象包装器
isSymbol(Object(Symbol('test'))); // true

// 其他类型返回 false
isSymbol('symbol'); // false
isSymbol(123); // false
isSymbol(true); // false
isSymbol(null); // false
isSymbol(undefined); // false
isSymbol({}); // false
isSymbol([]); // false
```

也正确识别各种内置符号。

```typescript
import { isSymbol } from 'es-toolkit/compat';

// 众所周知的符号
isSymbol(Symbol.iterator); // true
isSymbol(Symbol.asyncIterator); // true
isSymbol(Symbol.toStringTag); // true
isSymbol(Symbol.hasInstance); // true
isSymbol(Symbol.toPrimitive); // true

// 全局符号
isSymbol(Symbol.for('myGlobalSymbol')); // true

// 用户定义符号
const mySymbol = Symbol('mySymbol');
isSymbol(mySymbol); // true
```

#### 参数

- `value` (`unknown`): 要检查是否为符号的值。

#### 返回值

(`value is symbol`): 如果值为符号则返回 `true`，否则返回 `false`。
