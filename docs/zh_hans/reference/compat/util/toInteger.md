# toInteger (Lodash 兼容性)

将值转换为整数。

```typescript
const integer = toInteger(value);
```

## 参考

### `toInteger(value)`

将值转换为整数。小数部分被舍弃，只保留整数部分。

```typescript
import { toInteger } from 'es-toolkit/compat';

// 将小数转换为整数
toInteger(3.2);
// Returns: 3

// 将字符串数字转换为整数
toInteger('3.2');
// Returns: 3

// 非常小的数变为 0
toInteger(Number.MIN_VALUE);
// Returns: 0

// 无穷大变为 MAX_VALUE
toInteger(Infinity);
// Returns: 1.7976931348623157e+308
```

无效值转换为 0。

```typescript
import { toInteger } from 'es-toolkit/compat';

toInteger(NaN);
// Returns: 0

toInteger(Symbol.iterator);
// Returns: 0

toInteger(null);
// Returns: 0
```

#### 参数

- `value` (`unknown`): 要转换的值。

#### 返回值

(`number`): 返回转换后的整数。
