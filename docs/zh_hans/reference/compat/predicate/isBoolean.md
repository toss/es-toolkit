# isBoolean (Lodash 兼容性)

::: warning 请使用 `typeof` 运算符
此 `isBoolean` 函数由于 Boolean 对象包装器处理而变得复杂。

请改用更简单的现代化 `typeof value === 'boolean'`。
:::

检查值是否为布尔（boolean）类型。

```typescript
const result = isBoolean(value);
```

## 用法

### `isBoolean(value)`

当您想要类型安全地检查值是否为布尔类型时，请使用 `isBoolean`。检查原始布尔值和 Boolean 对象包装器。在 TypeScript 中也作为类型守卫工作。

```typescript
import { isBoolean } from 'es-toolkit/compat';

// 原始布尔值
isBoolean(true); // true
isBoolean(false); // true

// Boolean 对象包装器
isBoolean(new Boolean(true)); // true
isBoolean(new Boolean(false)); // true

// 其他类型返回 false
isBoolean(0); // false
isBoolean(1); // false
isBoolean('true'); // false
isBoolean('false'); // false
isBoolean(null); // false
isBoolean(undefined); // false
isBoolean({}); // false
isBoolean([]); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为布尔类型的值。

#### 返回值

(`value is boolean`): 如果值是布尔类型则返回 `true`，否则返回 `false`。
