# trim

从字符串的开头和结尾删除空白或指定字符。

```typescript
const trimmed = trim(str, chars);
```

## 用法

### `trim(str, chars?)`

当您想从字符串的开头和结尾删除不必要的字符时,请使用 `trim`。如果未指定特定字符,则删除空白字符。

```typescript
import { trim } from 'es-toolkit/string';

// 基本空白删除
trim('  hello  '); // 'hello'
trim('\t\n  hello  \r\n'); // 'hello'

// 删除特定字符
trim('--hello--', '-'); // 'hello'
trim('***hello***', '*'); // 'hello'

// 如果多个字符中的任何一个匹配则删除
trim('##hello##world##', ['#', 'd']); // 'hello##worl'
```

当您将多个字符指定为数组时,会删除与其中任何一个匹配的所有字符。

```typescript
import { trim } from 'es-toolkit/string';

// 将多个字符指定为数组
trim('!!@@hello@@!!', ['!', '@']); // 'hello'

// 删除数字和特殊字符
trim('123abc123', ['1', '2', '3']); // 'abc'

// 同时删除字符和空格
trim('  __hello__  ', ['_', ' ']); // 'hello'
```

#### 参数

- `str` (`string`): 要从开头和结尾删除字符的字符串。
- `chars` (`string | string[]`, 可选): 要删除的字符。可以使用字符串或字符数组。默认为空白字符。

#### 返回值

(`string`): 返回从开头和结尾删除指定字符的新字符串。
