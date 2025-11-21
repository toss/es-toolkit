# toUpper (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.toUpperCase`

这个 `toUpper` 函数由于处理非字符串值而性能较慢。

请使用更快、更现代的 JavaScript 的 `String.prototype.toUpperCase`。

:::

将值转换为字符串后转换为大写。

```typescript
const uppercased = toUpper(value);
```

## 用法

### `toUpper(value?)`

当您想将值转换为大写字符串时,请使用 `toUpper`。它首先将任何类型的值转换为字符串,然后转换为大写。

```typescript
import { toUpper } from 'es-toolkit/compat';

// 将字符串转换为大写
toUpper('--foo-bar--');
// Returns: '--FOO-BAR--'

toUpper('Hello World');
// Returns: 'HELLO WORLD'

// 转换数字
toUpper(123);
// Returns: '123'

// 转换数组
toUpper([1, 2, 3]);
// Returns: '1,2,3'
```

`null` 和 `undefined` 被处理为空字符串。

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper(null);
// Returns: ''

toUpper(undefined);
// Returns: ''

toUpper();
// Returns: ''
```

#### 参数

- `value` (`unknown`, 可选): 要转换为大写的值。

#### 返回值

(`string`): 返回大写字符串.
