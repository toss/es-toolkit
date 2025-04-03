
# constantCase

将字符串转换为大写格式。

常量命名格式是一种命名约定，每个单词均使用大写字母，并通过下划线（`_`）分隔。例如，`CONSTANT_CASE`。

## 签名

```typescript
function constantCase(str: string): string;
```

### 参数

- `str` (`string`): 需要转换为常量格式的字符串。

### 返回值

(`string`) 转换后的常量格式字符串。

## 示例

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('camelCase'); // 返回 'CAMEL_CASE'
constantCase('some whitespace'); // 返回 'SOME_WHITESPACE'
constantCase('hyphen-text'); // 返回 'HYPHEN_TEXT'
constantCase('HTTPRequest'); // 返回 'HTTP_REQUEST'
```
