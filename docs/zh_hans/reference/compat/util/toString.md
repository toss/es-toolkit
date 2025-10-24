# toString (Lodash 兼容性)

::: warning 使用 String 构造函数

这个 `toString` 函数由于复杂的数组处理和 -0 特殊情况处理而运行缓慢。

改为使用更快、更现代的 String(value)。

:::

将值转换为字符串。

```typescript
const str = toString(value);
```

## 参考

### `toString(value)`

将值转换为字符串。null 和 undefined 转换为空字符串，保留 -0 的符号。

```typescript
import { toString } from 'es-toolkit/compat';

// 基本类型
toString(null);
// Returns: ''

toString(undefined);
// Returns: ''

toString('hello');
// Returns: 'hello'

toString(123);
// Returns: '123'

// 保留 -0 的符号
toString(-0);
// Returns: '-0'
```

数组进行递归转换。

```typescript
import { toString } from 'es-toolkit/compat';

// 将数组转换为字符串
toString([1, 2, 3]);
// Returns: '1,2,3'

// 嵌套数组
toString([1, [2, 3], 4]);
// Returns: '1,2,3,4'

// 包含 -0 的数组
toString([1, 2, -0]);
// Returns: '1,2,-0'

// 包含符号的数组
toString([Symbol('a'), Symbol('b')]);
// Returns: 'Symbol(a),Symbol(b)'
```

#### 参数

- `value` (`any`): 要转换的值。

#### 返回值

(`string`): 返回转换后的字符串。null 和 undefined 返回空字符串。
