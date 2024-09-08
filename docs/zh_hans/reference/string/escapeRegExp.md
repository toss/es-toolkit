# escapeRegExp

转义 `str` 中的正则表达式特殊字符 `"^"`, `"$"`, `"\\"`, `"."`, `"\*"`, `"+"`, `"?"`, `"("`, `")"`, `"["`, `"]"`, `"{"`, `"}"`, 和 `"|"`。

## 签名

```typescript
function escapeRegExp(str: string): string;
```

### 参数

- `str` (`string`): 要转义的字符串。

### 返回值

(`string`): 转义后的字符串。

## 示例

```typescript
import { escapeRegExp } from 'es-toolkit/string';

escapeRegExp('[es-toolkit](https://es-toolkit.slash.page/)'); // 返回 '\[es-toolkit\]\(https://es-toolkit\.slash\.page/\)'
```
