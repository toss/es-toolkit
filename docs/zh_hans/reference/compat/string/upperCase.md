# upperCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `upperCase`

由于需要处理 `null` 或 `undefined` 的规范化逻辑,此 `upperCase` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [upperCase](../../string/upperCase.md)。

:::

将字符串转换为大写形式。

```typescript
const upperCased = upperCase(str);
```

## 用法

### `upperCase(str)`

当您想要将字符串转换为大写形式 (UPPER CASE) 时,请使用 `upperCase`。大写是一种命名约定,每个单词都用大写字母书写并用空格连接。

```typescript
import { upperCase } from 'es-toolkit/compat';

// 转换驼峰命名
upperCase('camelCase');
// 返回: 'CAMEL CASE'

// 转换空格分隔的字符串
upperCase('some whitespace');
// 返回: 'SOME WHITESPACE'

// 转换连字符分隔的字符串
upperCase('hyphen-text');
// 返回: 'HYPHEN TEXT'

// 当大写字母连续出现时
upperCase('HTTPRequest');
// 返回: 'HTTP REQUEST'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { upperCase } from 'es-toolkit/compat';

upperCase(null); // ''
upperCase(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要转换为大写形式的字符串。

#### 返回值

(`string`): 返回转换为大写形式的字符串。
