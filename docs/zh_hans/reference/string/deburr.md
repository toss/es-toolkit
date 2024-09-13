# deburr

将字符串转换为 ASCII 等效字符，通过替换特殊字符和重音符号。例如，`"Crème brûlée"` 变为 `"Creme brulee"`。

## 签名

```typescript
function deburr(str: string): string;
```

### 参数

- `str` (`string`): 要处理的字符串。

### 返回值

- (`string`) 处理后的字符串。

## 示例

```typescript
import { deburr } from 'es-toolkit/string';

deburr('déjà vu'); // 返回 'deja vu'
deburr('Æthelred'); // 返回: 'Aethelred'
deburr('München'); // 返回: 'Munchen'
deburr('Crème brûlée'); // 返回: 'Creme brulee'
```
