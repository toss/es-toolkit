# toFinite (Lodash 兼容性)

将值转换为有限数字。

```typescript
const finite = toFinite(value);
```

## 用法

### `toFinite(value)`

将值转换为有限数字。无穷大转换为 Number.MAX_VALUE，NaN 转换为 0。

```typescript
import { toFinite } from 'es-toolkit/compat';

// 普通数字原样返回
toFinite(3.2);
// Returns: 3.2

// 无穷大转换为 MAX_VALUE
toFinite(Infinity);
// Returns: 1.7976931348623157e+308

toFinite(-Infinity);
// Returns: -1.7976931348623157e+308

// 字符串数字转换为数字
toFinite('3.2');
// Returns: 3.2
```

无效值转换为 0。

```typescript
import { toFinite } from 'es-toolkit/compat';

toFinite(NaN);
// Returns: 0

toFinite(Symbol.iterator);
// Returns: 0

toFinite(null);
// Returns: 0
```

#### 参数

- `value` (`unknown`): 要转换的值。

#### 返回值

(`number`): 返回转换后的有限数字。
