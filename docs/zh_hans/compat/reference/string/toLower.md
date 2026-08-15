# toLower (Lodash 兼容性)

::: warning 使用 JavaScript 的 `String.prototype.toLowerCase`

此 `toLower` 函数由于处理非字符串值而运行缓慢。

请使用更快、更现代的 JavaScript 的 `String.prototype.toLowerCase`。

:::

将值转换为字符串后再转换为小写。

```typescript
const lowercased = toLower(value);
```

## 用法

### `toLower(value?)`

当您想将值转换为小写字符串时,请使用 `toLower`。它首先将任何类型的值转换为字符串,然后转换为小写。

```typescript
import { toLower } from 'es-toolkit/compat';

// 将字符串转换为小写
toLower('--FOO-BAR--');
// Returns: '--foo-bar--'

toLower('Hello World');
// Returns: 'hello world'

// 转换数字
toLower(123);
// Returns: '123'

// 转换数组
toLower([1, 2, 3]);
// Returns: '1,2,3'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { toLower } from 'es-toolkit/compat';

toLower(null);
// Returns: ''

toLower(undefined);
// Returns: ''

toLower();
// Returns: ''
```

#### 参数

- `value` (`unknown`,可选): 要转换为小写的值。

#### 返回值

(`string`): 返回转换为小写的字符串。
