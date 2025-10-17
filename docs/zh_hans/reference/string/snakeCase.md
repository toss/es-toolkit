# snakeCase

将字符串转换为蛇形命名法。

```typescript
const converted = snakeCase(str);
```

## 参考

### `snakeCase(str)`

当您想要将字符串转换为蛇形命名法时，请使用 `snakeCase`。蛇形命名法是一种命名约定，其中每个单词都以小写字母书写，单词之间用下划线(_)连接。

```typescript
import { snakeCase } from 'es-toolkit/string';

// 基本用法
snakeCase('camelCase'); // 'camel_case'
snakeCase('some whitespace'); // 'some_whitespace'

// 用连字符或其他分隔符连接的单词
snakeCase('hyphen-text'); // 'hyphen_text'
snakeCase('PascalCase'); // 'pascal_case'

// 处理连续大写字母
snakeCase('HTTPRequest'); // 'http_request'
snakeCase('XMLHttpRequest'); // 'xml_http_request'
```

它也能正确处理包含各种分隔符的字符串。

```typescript
import { snakeCase } from 'es-toolkit/string';

// 混合分隔符的情况
snakeCase('camelCase-with_mixed.separators'); // 'camel_case_with_mixed_separators'

// 包含数字的情况
snakeCase('version2.1.0'); // 'version_2_1_0'

// 包含特殊字符的情况
snakeCase('user@email.com'); // 'user_email_com'
```

#### 参数

- `str` (`string`): 要转换为蛇形命名法的字符串。

#### 返回值

(`string`): 返回转换为蛇形命名法的新字符串。
