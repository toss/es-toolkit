# toLength (Lodash 兼容性)

将值转换为有效的数组索引。

```typescript
const length = toLength(value);
```

## 用法

### `toLength(value)`

将值转换为有效的数组索引。限制为 0 以上 2^32-1 以下的整数。

```typescript
import { toLength } from 'es-toolkit/compat';

// 将小数转换为整数
toLength(3.2);
// Returns: 3

// 负数转换为 0
toLength(-1);
// Returns: 0

// 字符串数字进行转换
toLength('42');
// Returns: 42

// 非常大的数转换为限制值
toLength(Number.MAX_VALUE);
// Returns: 4294967295
```

null 或 undefined 转换为 0。

```typescript
import { toLength } from 'es-toolkit/compat';

toLength(null);
// Returns: 0

toLength(undefined);
// Returns: 0
```

#### 参数

- `value` (`unknown`): 要转换的值。

#### 返回值

(`number`): 返回 0 以上 2^32-1 以下的有效数组索引。
