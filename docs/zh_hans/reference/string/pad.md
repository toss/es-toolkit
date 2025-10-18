# pad

在字符串两侧添加字符以达到指定长度。

```typescript
const padded = pad(str, length, chars);
```

## 参考

### `pad(str, length, chars?)`

当字符串长度短于指定长度时，使用 `pad` 在字符串两侧添加字符以匹配目标长度。如果无法在两侧均匀分配填充字符，则右侧会多一个字符。

```typescript
import { pad } from 'es-toolkit/string';

// 使用默认空格填充
pad('abc', 8);
// => '  abc   '

// 使用自定义字符填充
pad('abc', 8, '_-');
// => '_-abc_-_'

// 当字符串已经长于或等于目标长度时
pad('abc', 3);
// => 'abc'

pad('abcdef', 3);
// => 'abcdef'
```

当填充字符无法均匀分配到目标长度时，右侧会更长。

```typescript
import { pad } from 'es-toolkit/string';

pad('abc', 9, '123');
// => '123abc123' (左侧 3 个字符，右侧 3 个字符)

pad('abc', 10, '123');
// => '123abc1231' (左侧 3 个字符，右侧 4 个字符)
```

#### 参数

- `str` (`string`): 要填充的字符串。
- `length` (`number`): 目标长度。
- `chars` (`string`, 可选): 用于填充的字符。默认值为 `' '`。

#### 返回值

(`string`): 返回填充后的字符串。
