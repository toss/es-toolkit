# camelCase

字符串转换为驼峰命名法。

驼峰命名法是一种命名约定，其中第一个单词小写，后续每个单词首字母大写。例如，`camelCase`。

## 签名

```typescript
function camelCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为驼峰命名法的字符串。

### Returns

(`string`) 转换后的驼峰命名法字符串。

## 示例

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('camelCase'); // 返回 'camelCase'
camelCase('some whitespace'); // 返回 'someWhitespace'
camelCase('hyphen-text'); // 返回 'hyphenText'
camelCase('HTTPRequest'); // 返回 'httpRequest'
camelCase('Keep unicode 😅') // 返回 'keepUnicode😅'
```
