# lowerFirst

将字符串的第一个字符转换为小写。

```typescript
const result = lowerFirst(str);
```

## 参考

### `lowerFirst(str)`

当您想要将字符串的第一个字母转换为小写时,请使用 `lowerFirst`。其余字符保持不变。这对于创建驼峰式变量名或属性名很有用。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 基本用法
lowerFirst('Hello'); // returns 'hello'
lowerFirst('WORLD'); // returns 'wORLD'
lowerFirst('JavaScript'); // returns 'javaScript'
```

它可以正确处理空字符串和单字符字符串。

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst(''); // returns ''
lowerFirst('A'); // returns 'a'
lowerFirst('a'); // returns 'a'
```

您可以将其用于驼峰式转换。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 将类名转换为实例变量名
const className = 'UserService';
const instanceName = lowerFirst(className); // 'userService'

// 将常量名转换为驼峰式
const constantName = 'API_BASE_URL';
const camelCase = lowerFirst(constantName.toLowerCase().replace(/_(.)/g, (_, letter) => letter.toUpperCase()));
// 结果为 'apiBaseUrl'
```

它还可用于 API 响应或数据转换。

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 将数据库列名转换为 JavaScript 属性名
const dbColumns = ['UserId', 'FirstName', 'LastName', 'EmailAddress'];
const jsProperties = dbColumns.map(column => lowerFirst(column));
// returns ['userId', 'firstName', 'lastName', 'emailAddress']

// 生成函数名
function createGetter(propertyName: string): string {
  return `get${propertyName}`;
}

function createSetter(propertyName: string): string {
  return `set${propertyName}`;
}

const property = lowerFirst('UserName'); // 'userName'
const getter = createGetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'getUserName'
const setter = createSetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'setUserName'
```

#### 参数

- `str` (`string`): 要将第一个字符转换为小写的字符串。

#### 返回值

(`string`): 返回第一个字符已转换为小写的新字符串。
