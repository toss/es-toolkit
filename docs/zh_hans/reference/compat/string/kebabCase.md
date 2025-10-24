# kebabCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `kebabCase`

由于处理非字符串输入值和删除缩写撇号等原因,此 `kebabCase` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [kebabCase](../../string/kebabCase.md)。

:::

将字符串转换为短横线命名法。

```typescript
const result = kebabCase(str);
```

## 参考

### `kebabCase(str)`

将字符串转换为短横线命名法。短横线命名法是一种命名约定,每个单词以小写字母书写,并用短横线(-)字符连接。它通常用于URL和CSS类名。

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase('camelCase'); // 'camel-case'
kebabCase('some whitespace'); // 'some-whitespace'
kebabCase('hyphen-text'); // 'hyphen-text'
kebabCase('HTTPRequest'); // 'http-request'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase(123); // '123'
kebabCase(null); // ''
kebabCase(undefined); // ''
```

#### 参数

- `str` (`string | object`,可选): 要转换为短横线命名法的值。

#### 返回值

(`string`): 返回转换为短横线命名法的字符串。
