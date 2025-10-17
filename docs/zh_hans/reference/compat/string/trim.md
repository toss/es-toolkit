# trim (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `trim`

由于需要处理 `null` 或 `undefined` 以及数组类型的 `chars`,此 `trim` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [trim](../../string/trim.md)。

:::

移除字符串开头和结尾的空格或指定字符。

```typescript
const trimmed = trim(str, chars);
```

## 参考

### `trim(str, chars)`

当您想要移除字符串开头和结尾的空格或特定字符时,请使用 `trim`。如果未指定 `chars`,则只移除开头和结尾的空格。

```typescript
import { trim } from 'es-toolkit/compat';

// 移除开头和结尾的空格
trim('  hello  ');
// 返回: 'hello'

// 移除指定字符
trim('--hello--', '-');
// 返回: 'hello'

// 使用数组移除多个字符
trim('##hello##', ['#', 'o']);
// 返回: 'hell'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { trim } from 'es-toolkit/compat';

trim(null); // ''
trim(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要修剪的字符串。
- `chars` (`string`, 可选): 要移除的字符。如果未指定,将移除空格。

#### 返回值

(`string`): 返回从开头和结尾移除指定字符后的字符串。
