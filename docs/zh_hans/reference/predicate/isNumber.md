# isNumber

检查给定值是否为数字类型。

```typescript
const result = isNumber(value);
```

## 用法

### `isNumber(value)`

当您想检查值是否为数字时使用 `isNumber`。

```typescript
import { isNumber } from 'es-toolkit/predicate';

// 基本数字值检查
isNumber(123); // true
isNumber(3.14); // true
isNumber(NaN); // true
isNumber(Infinity); // true

// 与其他类型区分
isNumber('123'); // false
isNumber(true); // false
isNumber(null); // false
isNumber(undefined); // false
```

在 TypeScript 中作为类型守卫使用时特别有用。

```typescript
import { isNumber } from 'es-toolkit';

function processValue(value: unknown) {
  if (isNumber(value)) {
    // value 类型被缩小为 number
    console.log(value * 2);
  } else {
    console.log('不是数字');
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为数字类型的值。

#### 返回值

(`value is number`): 如果值为数字则返回 `true`，否则返回 `false`。
