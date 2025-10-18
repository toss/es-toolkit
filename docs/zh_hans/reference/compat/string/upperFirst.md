# upperFirst (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `upperFirst`

由于需要处理 `null` 或 `undefined` 的转换逻辑,此 `upperFirst` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [upperFirst](../../string/upperFirst.md)。

:::

将字符串的第一个字符转换为大写。

```typescript
const upperCased = upperFirst(str);
```

## 参考

### `upperFirst(str)`

当您想要仅将字符串的第一个字符大写时,请使用 `upperFirst`。其余字符保持不变。

```typescript
import { upperFirst } from 'es-toolkit/compat';

// 以小写字母开头的字符串
upperFirst('fred');
// 返回: 'Fred'

// 已经以大写字母开头的字符串
upperFirst('Fred');
// 返回: 'Fred'

// 全大写字符串
upperFirst('FRED');
// 返回: 'FRED'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { upperFirst } from 'es-toolkit/compat';

upperFirst(null); // ''
upperFirst(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要将第一个字符转换为大写的字符串。

#### 返回值

(`string`): 返回第一个字符转换为大写后的字符串。
