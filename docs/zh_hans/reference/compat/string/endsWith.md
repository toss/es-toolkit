# endsWith (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.endsWith`

由于处理 `null` 或 `undefined`,此 `endsWith` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.endsWith`。

:::

检查字符串是否以指定的字符串结尾。

```typescript
const result = endsWith(str, target);
```

## 用法

### `endsWith(str, target, position?)`

当您想检查字符串是否以特定字符串结尾时,请使用 `endsWith`。您还可以指定搜索的位置。

```typescript
import { endsWith } from 'es-toolkit/compat';

// 检查字符串结尾
endsWith('fooBar', 'Bar');
// Returns: true

endsWith('fooBar', 'foo');
// Returns: false

// 检查到特定位置
endsWith('fooBar', 'foo', 3);
// Returns: true (检查前3个字符'foo'是否以'foo'结尾)
```

`null` 或 `undefined` 返回 `false`。

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith(null, 'test');
// Returns: false

endsWith('test', null);
// Returns: false
```

#### 参数

- `str` (`string`,可选): 要搜索的字符串。
- `target` (`string`,可选): 要在末尾查找的字符串。
- `position` (`number`,可选): 结束搜索的位置。默认为字符串的完整长度。

#### 返回值

(`boolean`): 如果字符串以指定字符串结尾则返回 `true`,否则返回 `false`。
