# sentenceCase

将字符串转换为句子格式。

```typescript
const converted = sentenceCase(str);
```

## 用法

### `sentenceCase(str)`

当您想要将字符串转换为句子格式时,请使用 `sentenceCase`。句子格式是一种命名约定,只有第一个单词的首字母大写,其余字母全部小写,单词之间用空格连接。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 基本用法
sentenceCase('hello world'); // 'Hello world'
sentenceCase('HELLO WORLD'); // 'Hello world'

// 转换驼峰命名或帕斯卡命名
sentenceCase('fooBar'); // 'Foo bar'
sentenceCase('PascalCase'); // 'Pascal case'

// 用连字符或下划线连接的单词
sentenceCase('hello-world'); // 'Hello world'
sentenceCase('hello_world'); // 'Hello world'
```

在将字段名或枚举值等标识符转换为易读的标签时非常有用。

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('firstName'); // 'First name'
sentenceCase('MAX_RETRY_COUNT'); // 'Max retry count'
sentenceCase('user-profile-settings'); // 'User profile settings'
```

它还能正确处理包含各种分隔符和特殊字符的字符串。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 包含多个分隔符的情况
sentenceCase('--foo-bar--'); // 'Foo bar'
sentenceCase('__FOO_BAR__'); // 'Foo bar'

// 处理连续大写字母和数字
sentenceCase('XMLHttpRequest'); // 'Xml http request'
sentenceCase('_abc_123_def'); // 'Abc 123 def'

// 空字符串或只有无意义分隔符的情况
sentenceCase('_-_-_-_'); // ''
sentenceCase('12abc 12ABC'); // '12 abc 12 abc'
```

#### 参数

- `str` (`string`): 要转换为句子格式的字符串。

#### 返回值

(`string`): 返回一个新字符串,第一个单词的首字母大写,其余字母小写,并用空格连接。

## 试一试

::: sandpack

```ts index.ts
import { sentenceCase } from 'es-toolkit/string';

console.log(sentenceCase('sentenceCase'));
```

:::
