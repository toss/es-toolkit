# constantCase

将字符串转换为常量命名法（constant case）。

常量命名法是一种命名约定，其中每个单词都以大写字母书写，并用下划线（\_）分隔。

例如 `CONSTANT_CASE`。

## 签名

```typescript
function constantCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为常量命名法的字符串。

### 返回值

(`string`) 转换后的常量命名法字符串。

## 示例

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('camelCase'); // 返回  'CAMEL_CASE'
constantCase('some whitespace'); // 返回  'SOME_WHITESPACE'
constantCase('hyphen-text'); // 返回  'HYPHEN_TEXT'
constantCase('HTTPRequest'); // 返回  'HTTP_REQUEST'
```
