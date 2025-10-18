# lowerCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `lowerCase`

由于处理非字符串输入值和删除缩写撇号等原因,此 `lowerCase` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [lowerCase](../../string/lowerCase.md)。

:::

将字符串转换为小写单词并用空格分隔。

```typescript
const result = lowerCase(str);
```

## 参考

### `lowerCase(str)`

将字符串转换为小写单词并用空格分隔。每个单词都转换为小写并用空格字符连接。这对于创建人类可读的文本形式很有用。

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase('camelCase'); // 'camel case'
lowerCase('some whitespace'); // 'some whitespace'
lowerCase('hyphen-text'); // 'hyphen text'
lowerCase('HTTPRequest'); // 'http request'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase(123); // '123'
lowerCase(null); // ''
lowerCase(undefined); // ''
```

#### 参数

- `str` (`string | object`,可选): 要转换为小写格式的值。

#### 返回值

(`string`): 返回小写单词用空格分隔的字符串。
