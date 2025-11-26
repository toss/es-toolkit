# isNotNil

检查值是否既不是 `null` 也不是 `undefined`。

```typescript
const result = isNotNil(value);
```

## 用法

### `isNotNil(value)`

当您想检查值是否既不是 `null` 也不是 `undefined` 时，请使用 `isNotNil`。它对于从数组中过滤掉 `null` 或 `undefined` 值特别有用。

```typescript
import { isNotNil } from 'es-toolkit/predicate';

// 基本用法
console.log(isNotNil(42)); // true
console.log(isNotNil('hello')); // true
console.log(isNotNil([])); // true
console.log(isNotNil({})); // true

console.log(isNotNil(null)); // false
console.log(isNotNil(undefined)); // false

// 在数组过滤中很有用
const mixedArray = [1, null, 'hello', undefined, true, 0];
const filteredArray = mixedArray.filter(isNotNil);
// filteredArray 变成 [1, 'hello', true, 0]（null 和 undefined 被移除）
```

它也可以在 TypeScript 中用作类型守卫。

```typescript
function processItems(items: (string | null | undefined)[]) {
  // 使用 isNotNil 过滤会将类型缩小为 string[]
  const validItems = items.filter(isNotNil);

  validItems.forEach(item => {
    // item 现在被保证是 string 类型
    console.log(item.toUpperCase());
  });
}
```

#### 参数

- `value` (`T | null | undefined`): 要检查是否既不是 `null` 也不是 `undefined` 的值。

#### 返回值

(`boolean`): 如果值既不是 `null` 也不是 `undefined` 则返回 `true`，否则返回 `false`。
