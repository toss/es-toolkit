# isRegExp (Lodash 兼容性)

::: warning 使用 es-toolkit 的 [isRegExp](../../predicate/isRegExp.md)
这个 `isRegExp` 函数是 Lodash 兼容性的函数，但是简单的类型检查。

请使用更快且现代的 es-toolkit 的 [isRegExp](../../predicate/isRegExp.md)。
:::

检查值是否为正则表达式。

```typescript
const result = isRegExp(value);
```

## 用法

### `isRegExp(value)`

当您想类型安全地检查值是否为正则表达式时使用 `isRegExp`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 正则表达式
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
isRegExp(/[a-z]+/g); // true
isRegExp(/pattern/gi); // true

// 其他类型返回 false
isRegExp('/abc/'); // false (字符串)
isRegExp('pattern'); // false (字符串)
isRegExp({}); // false (对象)
isRegExp([]); // false (数组)
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(123); // false (数字)
```

区分正则表达式字符串和实际正则表达式对象。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 正则表达式 vs 正则表达式字符串
isRegExp(/test/); // true
isRegExp('/test/'); // false
isRegExp('\\d+'); // false
isRegExp('/\\d+/g'); // false

// 各种正则表达式标志
isRegExp(/test/i); // true (忽略大小写)
isRegExp(/test/g); // true (全局搜索)
isRegExp(/test/m); // true (多行)
isRegExp(/test/gim); // true (所有标志组合)
```

也识别动态创建的正则表达式。

```typescript
import { isRegExp } from 'es-toolkit/compat';

// 通过 RegExp 构造函数创建的正则表达式
const dynamicRegex = new RegExp('\\d{3}-\\d{4}', 'g');
isRegExp(dynamicRegex); // true

// 通过字符串创建的正则表达式
const pattern = 'hello';
const flags = 'gi';
const regex = new RegExp(pattern, flags);
isRegExp(regex); // true
```

#### 参数

- `value` (`any`): 要检查是否为正则表达式的值。

#### 返回值

(`value is RegExp`): 如果值为正则表达式则返回 `true`，否则返回 `false`。
