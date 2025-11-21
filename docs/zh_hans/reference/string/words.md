# words

将字符串拆分为单词数组。

```typescript
const result = words(str);
```

## 用法

### `words(str)`

当您想将字符串拆分为单独的单词时,请使用 `words`。它根据 camelCase、kebab-case、空格、标点符号拆分单词,并能正确识别表情符号和 Unicode 字符。在处理各种命名约定的字符串时很有用。

```typescript
import { words } from 'es-toolkit/string';

// 将由标点符号和空格分隔的字符串拆分为单词
words('fred, barney, & pebbles');
// 返回值: ['fred', 'barney', 'pebbles']

// 正确拆分 camelCase 和连续的大写字母
words('camelCaseHTTPRequest🚀');
// 返回值: ['camel', 'Case', 'HTTP', 'Request', '🚀']

// 处理 Unicode 字符和数字
words('Lunedì 18 Set');
// 返回值: ['Lunedì', '18', 'Set']
```

在各种情况下将字符串拆分为单词时都很有用:

```typescript
// 将变量名拆分为单词以转换为其他命名约定
const variableName = 'getUserProfile';
const wordList = words(variableName);
console.log(wordList); // ['get', 'User', 'Profile']

// 将 snake_case 拆分为单词
const snakeCase = 'user_profile_data';
const snakeWords = words(snakeCase);
console.log(snakeWords); // ['user', 'profile', 'data']

// 将 kebab-case 拆分为单词
const kebabCase = 'user-profile-data';
const kebabWords = words(kebabCase);
console.log(kebabWords); // ['user', 'profile', 'data']

// 处理复杂字符串
const complex = 'XMLHttpRequest2.0_parser-v1.2';
const complexWords = words(complex);
console.log(complexWords); // ['XML', 'Http', 'Request', '2', '0', 'parser', 'v', '1', '2']
```

#### 参数

- `str` (`string`): 要拆分为单词的字符串。

#### 返回值

(`string[]`): 返回从字符串中拆分出的单词数组。
