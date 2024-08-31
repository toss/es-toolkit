# deburr

转换字符串 `str` 中[拉丁语-1补充字母](<https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table>)和[拉丁语扩展字母-A](https://en.wikipedia.org/wiki/Latin_Extended-A)为基本的拉丁字母，并且去除[组合变音标记](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks)。

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
```
