# isUndefined

检查给定值是否为 `undefined`。

```typescript
const result = isUndefined(value);
```

## 用法

### `isUndefined(value)`

当您想检查值是否为 `undefined` 时,请使用 `isUndefined`。在检查变量是否已初始化或可选属性是否存在时非常有用。

```typescript
import { isUndefined } from 'es-toolkit/predicate';

// undefined 值
console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true

let uninitialized: string;
console.log(isUndefined(uninitialized)); // true

// 非 undefined 值
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(0)); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 undefined 的值。

#### 返回值

(`boolean`): 如果值是 undefined,则返回 `true`,否则返回 `false`。
