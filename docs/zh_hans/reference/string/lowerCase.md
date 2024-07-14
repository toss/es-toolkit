# lowerCase

将字符串转换为小写格式。

小写格式是一种命名约定，其中每个单词都以小写字母写入，并用空格 ` ` 分隔。例如，`lower case`。

## 签名

```typescript
function lowerCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为小写格式的字符串。

### Returns

(`string`) 转换后的小写格式字符串。

## Examples

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('camelCase'); // 返回 'camel case'
lowerCase('some whitespace'); // 返回 'some whitespace'
lowerCase('hyphen-text'); // 返回 'hyphen text'
lowerCase('HTTPRequest'); // 返回 'http request'
```
