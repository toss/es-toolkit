# trimStart

删除字符串开头的空白或指定字符。

```typescript
const trimmed = trimStart(str, chars);
```

## 参考

### `trimStart(str, chars?)`

当你想要删除字符串开头的不必要字符时使用 `trimStart`。如果不指定特定字符，则删除空白字符。

```typescript
import { trimStart } from 'es-toolkit/string';

// 删除默认空白
trimStart('  hello'); // 'hello'
trimStart('\t\n  hello'); // 'hello'

// 删除特定字符
trimStart('---hello', '-'); // 'hello'
trimStart('000123', '0'); // '123'
trimStart('abcabcabc', 'a'); // 'bcabcabc'
```

如果将多个字符指定为数组，则删除所有匹配其中任意一个的字符。

```typescript
import { trimStart } from 'es-toolkit/string';

// 将多个字符指定为数组
trimStart('!!@@hello', ['!', '@']); // 'hello'

// 删除数字和特殊字符
trimStart('123abc', ['1', '2', '3']); // 'abc'

// 同时删除字符和空白
trimStart('  __hello', ['_', ' ']); // 'hello'
```

#### 参数

- `str` (`string`): 要从开头删除字符的字符串。
- `chars` (`string | string[]`, 可选): 要删除的字符。可以是字符串或字符数组。默认为空白字符。

#### 返回值

(`string`): 返回一个从开头删除了指定字符的新字符串。
