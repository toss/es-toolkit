# isNull (Lodash 兼容性)

::: warning 使用 es-toolkit 的 [isNull](../../predicate/isNull.md)
这个 `isNull` 函数是 Lodash 兼容性的函数，但与主库具有相同的实现。

请使用更快且现代的 es-toolkit 的 [isNull](../../predicate/isNull.md)。
:::

检查值是否为 `null`。

```typescript
const result = isNull(value);
```

## 参考

### `isNull(value)`

当您想类型安全地检查值是否恰好为 `null` 时使用 `isNull`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isNull } from 'es-toolkit/compat';

// 只有 null 返回 true
isNull(null); // true

// undefined 也返回 false
isNull(undefined); // false

// 所有其他值也返回 false
isNull(0); // false
isNull(''); // false
isNull(false); // false
isNull([]); // false
isNull({}); // false
isNull('null'); // false
isNull(NaN); // false
```

可以区分检查 `null` 和 `undefined`。

```typescript
import { isNull } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isNull(value)) {
    console.log('值明确为 null');
  } else if (value === undefined) {
    console.log('值为 undefined');
  } else {
    console.log(`有值: ${value}`);
  }
}

handleValue(null); // "值明确为 null"
handleValue(undefined); // "值为 undefined"
handleValue('hello'); // "有值: hello"
```

#### 参数

- `value` (`any`): 要检查是否为 `null` 的值。

#### 返回值

(`value is null`): 如果值为 `null` 则返回 `true`，否则返回 `false`。
