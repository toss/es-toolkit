# toNumber (Lodash 兼容性)

::: warning 使用 Number 构造函数

这个 `toNumber` 函数由于符号类型检验和额外处理而运行缓慢。

改为使用更快、更现代的 Number 构造函数。

:::

将值转换为数字。

```typescript
const number = toNumber(value);
```

## 用法

### `toNumber(value)`

将值转换为数字。符号处理为 NaN。

```typescript
import { toNumber } from 'es-toolkit/compat';

// 普通数字原样返回
toNumber(3.2);
// Returns: 3.2

// 字符串数字进行转换
toNumber('3.2');
// Returns: 3.2

// 无穷大也原样返回
toNumber(Infinity);
// Returns: Infinity

// 非常小的数也原样返回
toNumber(Number.MIN_VALUE);
// Returns: 5e-324
```

符号和 NaN 转换为 NaN。

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Symbol.iterator);
// Returns: NaN

toNumber(NaN);
// Returns: NaN
```

#### 参数

- `value` (`unknown`): 要转换的值。

#### 返回值

(`number`): 返回转换后的数字。
