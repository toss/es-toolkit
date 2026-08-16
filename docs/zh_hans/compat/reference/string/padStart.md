# padStart (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.padStart`

由于处理非字符串值,此 `padStart` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.padStart`。

:::

在字符串开头添加填充以扩展到指定的长度。

```typescript
const padded = padStart(str, length, chars);
```

## 用法

### `padStart(str, length?, chars?)`

当您想在字符串开头添加填充以匹配所需长度时,请使用 `padStart`。

```typescript
import { padStart } from 'es-toolkit/compat';

// 用空格填充
padStart('abc', 6);
// Returns: '   abc'

// 用特定字符填充
padStart('abc', 6, '_-');
// Returns: '_-_abc'

// 如果原始长度更长则原样返回
padStart('abc', 3);
// Returns: 'abc'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { padStart } from 'es-toolkit/compat';

padStart(null, 5, '*');
// Returns: '*****'

padStart(undefined, 3);
// Returns: '   '
```

#### 参数

- `str` (`string`,可选): 要添加填充的字符串。
- `length` (`number`,可选): 希望的最终字符串长度。默认为 `0`。
- `chars` (`string`,可选): 用于填充的字符。默认为 `' '`(空格)。

#### 返回值

(`string`): 返回在开头添加了填充的字符串。
