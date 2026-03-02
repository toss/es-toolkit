# capitalize (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `capitalize`

由于处理非字符串输入值,此 `capitalize` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [capitalize](../../string/capitalize.md)。

:::

将字符串的第一个字符转换为大写,其余字符转换为小写。

```typescript
const result = capitalize(str);
```

## 用法

### `capitalize(str)`

将字符串的第一个字符转换为大写,其余字符转换为小写。这对于改善单词的第一印象或将其格式化为标题形式很有用。

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize('fred'); // 'Fred'
capitalize('FRED'); // 'Fred'
capitalize('fRED'); // 'Fred'
```

空字符串和非字符串值也可以处理。

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize(''); // ''
capitalize(123); // '123'
capitalize(null); // ''
capitalize(undefined); // ''
```

#### 参数

- `str` (`string`,可选): 要首字母大写的字符串。

#### 返回值

(`string`): 返回首字母大写、其余字母小写的字符串。
