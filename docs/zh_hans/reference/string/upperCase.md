# upperCase

将字符串转换为所有字母都是大写且单词用空格分隔的格式。

```typescript
const result = upperCase(str);
```

## 用法

### `upperCase(str)`

当您想将字符串转换为大写表示法时,请使用 `upperCase`。它将每个单词转换为大写并用空格连接单词。可以处理各种表示法的字符串,如 camelCase、kebab-case、snake_case 等。

```typescript
import { upperCase } from 'es-toolkit/string';

// 将camelCase转换为大写表示法
upperCase('camelCase');
// 返回值: 'CAMEL CASE'

// 也可以转换已有空格的字符串
upperCase('some whitespace');
// 返回值: 'SOME WHITESPACE'

// 将kebab-case转换为大写表示法
upperCase('hyphen-text');
// 返回值: 'HYPHEN TEXT'

// 也可以处理连续大写字母的字符串
upperCase('HTTPSRequest');
// 返回值: 'HTTPS REQUEST'
```

将各种命名约定转换为统一的大写格式时很有用:

```typescript
// 统一API响应中的各种键名
const apiKeys = ['user_name', 'firstName', 'email-address', 'phoneNumber'];
const upperCaseKeys = apiKeys.map(key => upperCase(key));
console.log(upperCaseKeys);
// ['USER NAME', 'FIRST NAME', 'EMAIL ADDRESS', 'PHONE NUMBER']

// 显示文件名时使用
const fileName = 'profile_image_thumbnail.jpg';
const displayName = upperCase(fileName.replace('.jpg', ''));
console.log(displayName); // 'PROFILE IMAGE THUMBNAIL'
```

#### 参数

- `str` (`string`): 要转换为大写表示法的字符串。

#### 返回值

(`string`): 返回每个单词都转换为大写并用空格分隔的字符串。
