# snakeCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `snakeCase`

此 `snakeCase` 函数由于处理 `null` 或 `undefined` 的规范化逻辑而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [snakeCase](../../string/snakeCase.md)。

:::

将字符串转换为蛇形命名法。

```typescript
const snakeCased = snakeCase(str);
```

## 参考

### `snakeCase(str)`

当您想将字符串转换为蛇形命名法 (snake_case) 时,请使用 `snakeCase`。蛇形命名法是一种命名约定,其中每个单词都以小写字母书写,并用下划线 (_) 连接。

```typescript
import { snakeCase } from 'es-toolkit/compat';

// 转换驼峰命名法
snakeCase('camelCase');
// Returns: 'camel_case'

// 转换空格分隔的字符串
snakeCase('some whitespace');
// Returns: 'some_whitespace'

// 转换连字符分隔的字符串
snakeCase('hyphen-text');
// Returns: 'hyphen_text'

// 处理连续大写字母
snakeCase('HTTPRequest');
// Returns: 'http_request'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { snakeCase } from 'es-toolkit/compat';

snakeCase(null); // ''
snakeCase(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要转换为蛇形命名法的字符串。

#### 返回值

(`string`): 返回转换为蛇形命名法的字符串。
