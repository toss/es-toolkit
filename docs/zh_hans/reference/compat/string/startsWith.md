# startsWith (Lodash 兼容性)

::: warning 请使用 JavaScript 的 `String.prototype.startsWith`

这个 `startsWith` 函数由于处理 `null` 或 `undefined` 而运行较慢。

请使用更快、更现代的 JavaScript 的 `String.prototype.startsWith`。

:::

检查字符串是否以指定字符串开头。

```typescript
const result = startsWith(str, target);
```

## 参考

### `startsWith(str, target, position?)`

当您想检查字符串是否以特定字符串开头时,使用 `startsWith`。您还可以指定开始搜索的位置。

```typescript
import { startsWith } from 'es-toolkit/compat';

// 检查字符串开头
startsWith('fooBar', 'foo');
// 返回值: true

startsWith('fooBar', 'bar');
// 返回值: false

// 从特定位置开始检查
startsWith('fooBar', 'Bar', 3);
// 返回值: true (检查从第3个位置开始是否以 'Bar' 开头)
```

对于 `null` 或 `undefined` 返回 `false`。

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith(null, 'test');
// 返回值: false

startsWith('test', null);
// 返回值: false
```

#### 参数

- `str` (`string`, 可选): 要检查的字符串。
- `target` (`string`, 可选): 要在开头查找的字符串。
- `position` (`number`, 可选): 开始搜索的位置。默认为 `0`。

#### 返回值

(`boolean`): 如果字符串以指定字符串开头则返回 `true`,否则返回 `false`。
