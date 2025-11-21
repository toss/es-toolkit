# trimEnd

移除字符串末尾的空白字符或指定字符。

```typescript
const trimmed = trimEnd(str, chars);
```

## 用法

### `trimEnd(str, chars?)`

当您想从字符串末尾删除不必要的字符时,请使用 `trimEnd`。如果未指定特定字符,则删除空白字符。

```typescript
import { trimEnd } from 'es-toolkit/string';

// 基本空白字符删除
trimEnd('hello  '); // 'hello'
trimEnd('hello\t\n  '); // 'hello'

// 删除特定字符
trimEnd('hello---', '-'); // 'hello'
trimEnd('123000', '0'); // '123'
trimEnd('abcabcabc', 'c'); // 'abcabcab'
```

将多个字符指定为数组时,会删除所有匹配其中任何一个的字符。

```typescript
import { trimEnd } from 'es-toolkit/string';

// 将多个字符指定为数组
trimEnd('hello!!@@', ['!', '@']); // 'hello'

// 删除数字和特殊字符
trimEnd('abc123', ['1', '2', '3']); // 'abc'

// 同时删除字符和空白字符
trimEnd('hello__  ', ['_', ' ']); // 'hello'
```

#### 参数

- `str` (`string`): 要从末尾删除字符的字符串。
- `chars` (`string | string[]`, 可选): 要删除的字符。可以是字符串或字符数组。默认为空白字符。

#### 返回值

(`string`): 返回从末尾删除指定字符后的新字符串。

#### 错误

如果 `chars` 是字符串且长度不为 1,则抛出错误。
