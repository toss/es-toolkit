# pad (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `pad`

由于处理 `null` 或 `undefined` 等原因,此 `pad` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [pad](../../string/pad.md)。

:::

在字符串的两侧添加填充字符以达到指定的长度。

```typescript
const padded = pad(str, length, chars);
```

## 参考

### `pad(str, length, chars)`

当您想在字符串两侧添加填充以匹配所需长度时,请使用 `pad`。如果填充字符不能均匀分配,额外的字符将放在右侧。

```typescript
import { pad } from 'es-toolkit/compat';

// 用默认空格填充
pad('abc', 8);
// Returns: '  abc   '

// 用指定字符填充
pad('abc', 8, '_-');
// Returns: '_-abc_-_'

// 如果已经足够长则原样返回
pad('abc', 3);
// Returns: 'abc'

// 如果长度更短则原样返回
pad('abc', 2);
// Returns: 'abc'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { pad } from 'es-toolkit/compat';

pad(null, 5); // '     '
pad(undefined, 3, '*'); // '***'
```

#### 参数

- `str` (`string`,可选): 要填充的字符串。
- `length` (`number`,可选): 目标长度。默认为 `0`。
- `chars` (`string`,可选): 用于填充的字符。默认为空格 `' '`。

#### 返回值

(`string`): 返回填充到指定长度的字符串。
