# camelCase (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `camelCase`

由于处理非字符串输入值和删除缩写撇号等原因,此 `camelCase` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [camelCase](../../string/camelCase.md)。

:::

将字符串转换为驼峰命名法。

```typescript
const result = camelCase(str);
```

## 参考

### `camelCase(str)`

将字符串转换为驼峰命名法。驼峰命名法是一种命名约定,第一个单词以小写字母开头,后续单词的首字母大写,所有单词连接时不带空格。

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase('camelCase'); // 'camelCase'
camelCase('some whitespace'); // 'someWhitespace'
camelCase('hyphen-text'); // 'hyphenText'
camelCase('HTTPRequest'); // 'httpRequest'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase(123); // '123'
camelCase(null); // ''
camelCase(undefined); // ''
```

#### 参数

- `str` (`string | object`,可选): 要转换为驼峰命名法的值。

#### 返回值

(`string`): 返回转换为驼峰命名法的字符串。
