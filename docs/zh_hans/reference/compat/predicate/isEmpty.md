# isEmpty (Lodash 兼容性)

检查给定值是否为空。

```typescript
const result = isEmpty(value);
```

## 用法

### `isEmpty(value)`

当您需要检查各种类型的值是否为空时，请使用 `isEmpty`。可以处理字符串、数组、对象、Map、Set 等。

```typescript
import { isEmpty } from 'es-toolkit/compat';

// 检查字符串
isEmpty(''); // true
isEmpty('hello'); // false

// 检查数组
isEmpty([]); // true
isEmpty([1, 2, 3]); // false

// 检查对象
isEmpty({}); // true
isEmpty({ a: 1 }); // false

// 检查 Map 和 Set
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false

// null 和 undefined
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(); // true

// 类数组对象
isEmpty({ 0: 'a', length: 1 }); // false
isEmpty({ length: 0 }); // false
```

原始值都被视为空值：

```typescript
import { isEmpty } from 'es-toolkit/compat';

isEmpty(0); // true
isEmpty(false); // true
isEmpty(123); // true
isEmpty('text'); // false (字符串按长度判断)
```

#### 参数

- `value` (`unknown`, 可选): 要检查的值。

#### 返回值

(`boolean`): 如果值为空则返回 `true`，否则返回 `false`。
