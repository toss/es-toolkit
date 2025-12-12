# repeat (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.repeat`

由于处理非字符串值和整数转换,此 `repeat` 函数运行较慢。

请改用更快、更现代的 JavaScript 的 `String.prototype.repeat`。

:::

将字符串重复指定次数。

```typescript
const repeated = repeat(str, n);
```

## 用法

### `repeat(str, n?)`

当您想多次重复字符串以创建新字符串时,请使用 `repeat`。如果重复次数小于1,则返回空字符串。

```typescript
import { repeat } from 'es-toolkit/compat';

// 重复字符串
repeat('abc', 2);
// Returns: 'abcabc'

repeat('hello', 3);
// Returns: 'hellohellohello'

// 重复0次返回空字符串
repeat('abc', 0);
// Returns: ''
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { repeat } from 'es-toolkit/compat';

repeat(null, 3);
// Returns: ''

repeat(undefined, 2);
// Returns: ''
```

如果不指定重复次数,则重复1次。

```typescript
import { repeat } from 'es-toolkit/compat';

repeat('abc');
// Returns: 'abc'
```

#### 参数

- `str` (`string`,可选): 要重复的字符串。
- `n` (`number`,可选): 重复次数。默认为 `1`。

#### 返回值

(`string`): 返回重复指定次数的字符串。
