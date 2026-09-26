# sentenceCase

将字符串转换为句子格式(Sentence case)。

```typescript
const result = sentenceCase(str);
```

## 用法

### `sentenceCase(str)`

当您想将字符串转换为句子格式时,请使用 `sentenceCase`。句子格式是一种命名规则,只有第一个单词的首字母大写,其余字母全部小写,单词之间用空格连接。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 将各种形式的字符串转换为句子格式
sentenceCase('hello world'); // returns 'Hello world'
sentenceCase('some-hyphen-text'); // returns 'Some hyphen text'
sentenceCase('CONSTANT_CASE'); // returns 'Constant case'
sentenceCase('PascalCase'); // returns 'Pascal case'
sentenceCase('mixed   SpAcE'); // returns 'Mixed sp ac e'
```

将属性名、枚举值、配置键等标识符转换为适合用作易读标签或消息的形式。

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 将属性名转换为表单标签
const fieldName = 'user_first_name';
const label = sentenceCase(fieldName); // 'User first name'

// 将常量名转换为显示文本
const errorCode = 'MAX_RETRY_COUNT';
const message = sentenceCase(errorCode); // 'Max retry count'
```

也会保留Unicode字符。

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('keep unicode 😅'); // returns 'Keep unicode 😅'
sentenceCase('한글-테스트'); // returns '한글 테스트'
```

#### 参数

- `str` (`string`): 要转换为句子格式的字符串。

#### 返回值

(`string`): 返回转换为句子格式的新字符串。
