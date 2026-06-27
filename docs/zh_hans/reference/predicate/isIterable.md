# isIterable

检查一个值是否可迭代（iterable）。

```typescript
const result = isIterable(value);
```

## 用法

### `isIterable(value)`

当您想检查一个值是否实现了可迭代协议，即是否具有 `Symbol.iterator` 方法时，请使用 `isIterable`。数组、字符串、`Set`、`Map`、类型化数组（typed array）和生成器是可迭代的；普通对象以及 `null`、`undefined` 不是可迭代的。

```typescript
import { isIterable } from 'es-toolkit/predicate';

// 可迭代的值
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable('abc')); // true
console.log(isIterable(new Set([1, 2, 3]))); // true
console.log(isIterable(new Map())); // true

// 不可迭代的值
console.log(isIterable({ a: 1 })); // false
console.log(isIterable(123)); // false
console.log(isIterable(null)); // false
```

它也可以在 TypeScript 中用作类型守卫。

```typescript
function collect(value: unknown): unknown[] {
  // 在此分支中，`value` 被收窄为 `Iterable<unknown>`
  if (isIterable(value)) {
    return [...value];
  }
  return [];
}
```

#### 参数

- `value` (`unknown`): 要检查的值。

#### 返回值

(`value is Iterable<unknown>`): 如果值是可迭代的，则返回 `true`，否则返回 `false`。
