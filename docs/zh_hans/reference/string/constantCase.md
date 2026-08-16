# constantCase

将字符串转换为常量命名法。

```typescript
const result = constantCase(str);
```

## 用法

### `constantCase(str)`

当您想将字符串转换为常量命名法时,请使用 `constantCase`。常量命名法是一种命名规则,所有字符都大写,单词之间用下划线(`_`)分隔。

```typescript
import { constantCase } from 'es-toolkit/string';

// 将各种形式的字符串转换为常量命名法
constantCase('hello world'); // returns 'HELLO_WORLD'
constantCase('camelCase'); // returns 'CAMEL_CASE'
constantCase('some-kebab-case'); // returns 'SOME_KEBAB_CASE'
constantCase('PascalCase'); // returns 'PASCAL_CASE'
constantCase('snake_case'); // returns 'SNAKE_CASE'
```

这是在JavaScript或其他编程语言中定义常量时常用的命名规则。

```typescript
import { constantCase } from 'es-toolkit/string';

// 生成环境变量名
const configKey = 'api base url';
const envVar = constantCase(configKey); // 'API_BASE_URL'

// 生成常量名
const settingName = 'maximum retry count';
const constantName = constantCase(settingName); // 'MAXIMUM_RETRY_COUNT'
```

也能适当处理包含空格或特殊字符的字符串。

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('HTTP Request'); // returns 'HTTP_REQUEST'
constantCase('user-agent-string'); // returns 'USER_AGENT_STRING'
constantCase('  multiple   spaces  '); // returns 'MULTIPLE_SPACES'
```

#### 参数

- `str` (`string`): 要转换为常量命名法的字符串。

#### 返回值

(`string`): 返回转换为常量命名法的新字符串。
