# lowerFirst (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `lowerFirst`

由于处理非字符串输入值,此 `lowerFirst` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [lowerFirst](../../string/lowerFirst.md)。

:::

将字符串的第一个字符转换为小写。

```typescript
const result = lowerFirst(str);
```

## 用法

### `lowerFirst(str)`

将字符串的第一个字符转换为小写。其余字符保持不变。这对于创建驼峰命名变量名或只想将第一个字符小写时很有用。

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst('fred'); // 'fred'
lowerFirst('Fred'); // 'fred'
lowerFirst('FRED'); // 'fRED'
lowerFirst(''); // ''
```

非字符串值也会在处理前转换为字符串。

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst(123); // '123'
lowerFirst(null); // ''
lowerFirst(undefined); // ''
```

#### 参数

- `str` (`string`,可选): 要将首字母转换为小写的字符串。

#### 返回值

(`string`): 返回首字母转换为小写的字符串。
