# lowerCase

将字符串转换为小写格式。

```typescript
const result = lowerCase(str);
```

## 用法

### `lowerCase(str)`

当您想将字符串转换为小写格式时，请使用 `lowerCase`。小写格式是一种命名约定，其中所有单词都用小写字母书写，单词之间用空格分隔。

```typescript
import { lowerCase } from 'es-toolkit/string';

// 将各种格式的字符串转换为小写格式
lowerCase('Hello World'); // returns 'hello world'
lowerCase('camelCase'); // returns 'camel case'
lowerCase('some-kebab-case'); // returns 'some kebab case'
lowerCase('PascalCase'); // returns 'pascal case'
lowerCase('SCREAMING_SNAKE_CASE'); // returns 'screaming snake case'
```

在创建面向用户的文本或标题时非常有用。

```typescript
import { lowerCase } from 'es-toolkit/string';

// 生成用户界面文本
const fieldName = 'firstName';
const label = lowerCase(fieldName); // 'first name'

// 将 API 键转换为用户友好的文本
const apiKeys = ['userEmail', 'phoneNumber', 'birthDate'];
const labels = apiKeys.map(key => lowerCase(key));
// returns ['user email', 'phone number', 'birth date']
```

在显示配置或选项名称时也可以使用。

```typescript
import { lowerCase } from 'es-toolkit/string';

// 显示设置菜单
const settings = {
  enableNotifications: true,
  darkModeEnabled: false,
  autoSaveInterval: 300,
};

for (const [key, value] of Object.entries(settings)) {
  const displayName = lowerCase(key);
  console.log(`${displayName}: ${value}`);
}
// 输出:
// enable notifications: true
// dark mode enabled: false
// auto save interval: 300
```

它可以正确处理带有特殊字符或空格的字符串。

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('HTTPSConnection'); // returns 'https connection'
lowerCase('user_profile-settings'); // returns 'user profile settings'
lowerCase('  mixed   CASE   text  '); // returns 'mixed case text'
```

#### 参数

- `str` (`string`): 要转换为小写格式的字符串。

#### 返回值

(`string`): 返回转换为小写格式的新字符串。
