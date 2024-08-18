# snakeCase

将字符串转换为蛇形命名法（snake case）。

蛇形命名法是一种命名约定，其中每个单词都以小写字母书写，并用下划线（\_）分隔。

例如 `snake_case`。

## 签名

```typescript
function snakeCase(str: string): string;
```

### 参数

- `str` (`string`): 要转换为蛇形命名法的字符串。

### 返回值

(`string`) 转换后的蛇形命名法字符串。

## 示例

```typescript
import { snakeCase } from 'es-toolkit/string';

snakeCase('camelCase'); // 返回  'camel_case'
snakeCase('some whitespace'); // 返回  'some_whitespace'
snakeCase('hyphen-text'); // 返回  'hyphen_text'
snakeCase('HTTPRequest'); // 返回  'http_request'
```
