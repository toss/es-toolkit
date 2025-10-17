# trimEnd (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `trimEnd`

由于需要处理 `null` 或 `undefined` 以及参数顺序变更,此 `trimEnd` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [trimEnd](../../string/trimEnd.md)。

:::

移除字符串结尾的空格或指定字符。

```typescript
const trimmed = trimEnd(str, chars);
```

## 参考

### `trimEnd(str, chars)`

当您想要移除字符串结尾的空格或特定字符时,请使用 `trimEnd`。如果未指定 `chars`,则只移除结尾的空格。

```typescript
import { trimEnd } from 'es-toolkit/compat';

// 移除结尾的空格
trimEnd('  abc  ');
// 返回: '  abc'

// 移除指定字符
trimEnd('-_-abc-_-', '_-');
// 返回: '-_-abc'

// 仅应用于字符串结尾
trimEnd('abc', 'a');
// 返回: 'abc'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { trimEnd } from 'es-toolkit/compat';

trimEnd(null); // ''
trimEnd(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要从结尾修剪的字符串。
- `chars` (`string`, 可选): 要移除的字符。如果未指定,将移除空格。

#### 返回值

(`string`): 返回从结尾移除指定字符后的字符串。
