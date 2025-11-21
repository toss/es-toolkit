# toSafeInteger (Lodash 兼容性)

将值转换为安全整数。

```typescript
const result = toSafeInteger(value);
```

## 用法

### `toSafeInteger(value)`

当您想要将值转换为安全整数时，请使用 `toSafeInteger`。安全整数是在 JavaScript 中可以准确表示的整数，在 `Number.MIN_SAFE_INTEGER` 和 `Number.MAX_SAFE_INTEGER` 范围内的值。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(3.2);
// Returns: 3

toSafeInteger(Infinity);
// Returns: 9007199254740991

toSafeInteger('3.2');
// Returns: 3

// 字符串转换
toSafeInteger('abc');
// Returns: 0

// 特殊值处理
toSafeInteger(NaN);
// Returns: 0

toSafeInteger(null);
// Returns: 0

toSafeInteger(undefined);
// Returns: 0
```

无穷大值也会限制在安全范围内。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(-Infinity);
// Returns: -9007199254740991 (Number.MIN_SAFE_INTEGER)

toSafeInteger(Number.MAX_VALUE);
// Returns: 9007199254740991
```

用作数组索引或 ID 值时很有用。

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

function getArrayItem(arr: any[], index: any) {
  const safeIndex = toSafeInteger(index);
  return arr[safeIndex];
}

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(getArrayItem(items, '2.7')); // 'c' (索引 2)
console.log(getArrayItem(items, Infinity)); // undefined (超出范围)
```

#### 参数

- `value` (`unknown`): 要转换的值。

#### 返回值

(`number`): 返回转换后的安全整数。
