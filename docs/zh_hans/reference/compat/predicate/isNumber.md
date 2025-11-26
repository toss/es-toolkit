# isNumber (Lodash 兼容性)

::: warning 使用 `typeof` 运算符
这个 `isNumber` 函数由于 Number 对象包装器处理而变得复杂。

请使用更简单且现代的 `typeof value === 'number'`。
:::

检查值是否为数字。

```typescript
const result = isNumber(value);
```

## 用法

### `isNumber(value)`

当您想检查值是否为数字时使用 `isNumber`。此函数将原始数字和 Number 对象都识别为数字。

```typescript
import { isNumber } from 'es-toolkit/compat';

// 原始数字
isNumber(123);
// 返回: true

isNumber(3.14);
// 返回: true

isNumber(NaN);
// 返回: true

// Number 对象
isNumber(new Number(42));
// 返回: true

// 其他类型
isNumber('123');
// 返回: false

isNumber(true);
// 返回: false

isNumber(null);
// 返回: false
```

#### 参数

- `value` (`unknown`): 要检查是否为数字的值。

#### 返回值

(`boolean`): 如果值为数字则返回 `true`，否则返回 `false`。
