# kebabCase

将字符串转换为短横线连接的小写格式。

短横线连接（kebab case）是一种命名约定，其中每个单词都以小写字母写入，并用短横线 `-` 分隔。例如，`kebab-case`。

## 签名

```typescript
function kebabCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为短横线连接格式的字符串。

### 返回值

(`string`): 转换后的短横线连接格式字符串。

## 示例

```typescript
import { kebabCase } from 'es-toolkit/string';

kebabCase('camelCase'); // 返回 'camel-case'
kebabCase('some whitespace'); // 返回 'some-whitespace'
kebabCase('hyphen-text'); // 返回 'hyphen-text'
kebabCase('HTTPRequest'); // 返回 'http-request'
```
