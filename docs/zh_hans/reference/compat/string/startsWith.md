# startsWith

::: info
这与我们的[兼容库](../../../compatibility.md)中的lodash完全兼容，`es-toolkit/compat`。
:::

检查字符串是否在其开头包含另一个字符串。

检查一个字符串是否以另一个字符串开头。可以选择一个可选的位置参数从某个索引开始搜索。

## 签名

```typescript
function startsWith(str: string, target: string, position: number = 0): string;
```

### 参数

- `str` (`string`): 要搜索的字符串。
- `target` (`string`): 应该包含在开头的字符串。
- `position` (`number`, 可选): 可选：从 str 字符串的某个偏移量开始搜索。

### 返回值

(`boolean`) str 字符串是否以 target 字符串开头。

## 示例

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith('fooBar', 'foo') // 返回 true
startsWith('fooBar', 'Bar') // 返回 false
startsWith('fooBar', 'abcdef') // 返回 false
startsWith('fooBar', 'Bar', 3) // 返回 true
```
