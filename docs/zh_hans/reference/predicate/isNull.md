# isNull

检查值是否为 `null`。

```typescript
const result = isNull(value);
```

## 用法

### `isNull(value)`

当您想检查值是否正好是 `null` 时，请使用 `isNull`。它使用严格相等（`===`）仅识别 `null` 而不识别 undefined。

```typescript
import { isNull } from 'es-toolkit/predicate';

// null 值
console.log(isNull(null)); // true

// 非 null 值
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
console.log(isNull(false)); // false
console.log(isNull([])); // false
console.log(isNull({})); // false
```

它也可以在 TypeScript 中用作类型守卫。

```typescript
function processValue(value: string | null | undefined) {
  if (isNull(value)) {
    // value 现在被缩小为 null 类型
    console.log('值为 null');
  } else {
    // value 被缩小为 string | undefined 类型
    console.log('值不是 null：', value);
  }
}
```

`isNull` 与 [`isNil`](./isNil.md) 不同，它将 `undefined` 视为 `false`。

```typescript
import { isNil, isNull } from 'es-toolkit/predicate';

console.log(isNull(undefined)); // false
console.log(isNil(undefined)); // true
```

#### 参数

- `value` (`unknown`): 要检查是否为 `null` 的值。

#### 返回值

(`value is null`): 如果值为 `null` 则返回 `true`，否则返回 `false`。
