# endsWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查字符串是否在其末尾包含另一个字符串。

检查一个字符串是否以另一个字符串结尾。可以选择一个可选的位置参数在这个位置之前进行搜索。

## 签名

```typescript
function endsWith(str: string, target: string, position: number = 0): string;
```

### 参数

- `str` (`string`): 要搜索的字符串。
- `target` (`string`): 应该包含在末尾的字符串。
- `position` (`number`, 可选): 搜索到这个字符位置。

### 返回值

(`boolean`): `str` 字符串是否以 `target` 字符串结尾。

## 示例

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith('fooBar', 'foo'); // 返回 false
endsWith('fooBar', 'Bar'); // 返回 true
endsWith('fooBar', 'abcdef'); // 返回 false
endsWith('fooBar', 'foo', 3); // 返回 true
```
