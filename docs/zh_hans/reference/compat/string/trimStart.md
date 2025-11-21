# trimStart (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `trimStart`

由于需要处理 `null` 或 `undefined` 以及参数顺序变更,此 `trimStart` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [trimStart](../../string/trimStart.md)。

:::

移除字符串开头的空格或指定字符。

```typescript
const trimmed = trimStart(str, chars);
```

## 用法

### `trimStart(str, chars)`

当您想要移除字符串开头的空格或特定字符时,请使用 `trimStart`。如果未指定 `chars`,则只移除开头的空格。

```typescript
import { trimStart } from 'es-toolkit/compat';

// 移除开头的空格
trimStart('  abc  ');
// 返回: 'abc  '

// 移除指定字符
trimStart('-_-abc-_-', '_-');
// 返回: 'abc-_-'

// 仅应用于字符串开头
trimStart('abc', 'c');
// 返回: 'abc'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { trimStart } from 'es-toolkit/compat';

trimStart(null); // ''
trimStart(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要从开头修剪的字符串。
- `chars` (`string`, 可选): 要移除的字符。如果未指定,将移除空格。

#### 返回值

(`string`): 返回从开头移除指定字符后的字符串。
