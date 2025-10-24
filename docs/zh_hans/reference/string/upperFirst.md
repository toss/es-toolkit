# upperFirst

将字符串的第一个字符转换为大写。

```typescript
const result = upperFirst(str);
```

## 参考

### `upperFirst(str)`

当您想将字符串的第一个字母大写而其余字母保持不变时,请使用 `upperFirst`。它在首字母大写句子开头或格式化名称时很有用。

```typescript
import { upperFirst } from 'es-toolkit/string';

// 将小写字符串的第一个字母大写
upperFirst('fred');
// 返回值: 'Fred'

// 如果第一个字母已经是大写,则保持不变
upperFirst('Fred');
// 返回值: 'Fred'

// 即使所有字母都是大写也保持不变
upperFirst('FRED');
// 返回值: 'FRED'
```

在各种情况下都很有用:

```typescript
// 格式化用户名
const userName = 'john';
const displayName = upperFirst(userName);
console.log(displayName); // 'John'

// 将句子的第一个字母大写
const sentence = 'hello world';
const capitalizedSentence = upperFirst(sentence);
console.log(capitalizedSentence); // 'Hello world'

// 处理多个名称
const names = ['alice', 'bob', 'charlie'];
const capitalizedNames = names.map(name => upperFirst(name));
console.log(capitalizedNames); // ['Alice', 'Bob', 'Charlie']

// 将camelCase转换为PascalCase
const camelCase = 'firstName';
const pascalCase = upperFirst(camelCase);
console.log(pascalCase); // 'FirstName'
```

#### 参数

- `str` (`string`): 要将第一个字母大写的字符串。

#### 返回值

(`string`): 返回第一个字母转换为大写的字符串。
