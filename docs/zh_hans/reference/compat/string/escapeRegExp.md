# escapeRegExp (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `escapeRegExp`

由于处理非字符串输入值,此 `escapeRegExp` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [escapeRegExp](../../string/escapeRegExp.md)。

:::

转义字符串中的正则表达式特殊字符。

```typescript
const result = escapeRegExp(str);
```

## 用法

### `escapeRegExp(str)`

转义字符串中的正则表达式特殊字符 `^`、`$`、`\`、`.`、`*`、`+`、`?`、`(`、`)`、`[`、`]`、`{`、`}`、`|`。当您想在动态创建正则表达式时将字符串按字面处理时很有用。

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp('[es-toolkit](https://es-toolkit.dev/)');
// '\\[es-toolkit\\]\\(https://es-toolkit\\.dev/\\)'

escapeRegExp('$^{}.+*?()[]|\\');
// '\\$\\^\\{\\}\\.\\+\\*\\?\\(\\)\\[\\]\\|\\\\'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp(123); // '123'
escapeRegExp(null); // ''
escapeRegExp(undefined); // ''
```

#### 参数

- `str` (`string`,可选): 要转义正则表达式特殊字符的字符串。

#### 返回值

(`string`): 返回正则表达式特殊字符被转义的字符串。
