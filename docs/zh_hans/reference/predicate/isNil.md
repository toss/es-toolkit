# isNil

检查值是否为 `null` 或 `undefined`。

```typescript
const result = isNil(value);
```

## 用法

### `isNil(value)`

当您想检查值是否为 `null` 或 `undefined` 时，请使用 `isNil`。

```typescript
import { isNil } from 'es-toolkit/predicate';

// null 或 undefined 值
console.log(isNil(null)); // true
console.log(isNil(undefined)); // true

// 其他值
console.log(isNil(0)); // false
console.log(isNil('')); // false
console.log(isNil(false)); // false
console.log(isNil([])); // false
console.log(isNil({})); // false
```

它也可以在 TypeScript 中用作类型守卫：

```typescript
function processValue(value: string | null | undefined) {
  if (isNil(value)) {
    // value 现在被缩小为 null | undefined 类型
    console.log('值为空');
  } else {
    // value 被缩小为 string 类型
    console.log(value.toUpperCase());
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 `null` 或 `undefined` 的值。

#### 返回值

(`value is null | undefined`): 如果值为 `null` 或 `undefined` 则返回 `true`，否则返回 `false`。
