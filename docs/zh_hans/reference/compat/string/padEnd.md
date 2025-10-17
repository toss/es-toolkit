# padEnd (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.padEnd`

由于处理非字符串值,此 `padEnd` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.padEnd`。

:::

在字符串末尾添加填充以扩展到指定的长度。

```typescript
const padded = padEnd(str, length, chars);
```

## 参考

### `padEnd(str, length?, chars?)`

当您想在字符串末尾添加填充以匹配所需长度时,请使用 `padEnd`。

```typescript
import { padEnd } from 'es-toolkit/compat';

// 用空格填充
padEnd('abc', 6);
// Returns: 'abc   '

// 用特定字符填充
padEnd('abc', 6, '_-');
// Returns: 'abc_-_'

// 如果原始长度更长则原样返回
padEnd('abc', 3);
// Returns: 'abc'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { padEnd } from 'es-toolkit/compat';

padEnd(null, 5, '*');
// Returns: '*****'

padEnd(undefined, 3);
// Returns: '   '
```

#### 参数

- `str` (`string`,可选): 要添加填充的字符串。
- `length` (`number`,可选): 希望的最终字符串长度。默认为 `0`。
- `chars` (`string`,可选): 用于填充的字符。默认为 `' '`(空格)。

#### 返回值

(`string`): 返回在末尾添加了填充的字符串。
