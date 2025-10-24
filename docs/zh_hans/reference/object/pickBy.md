# pickBy

返回一个仅包含满足条件函数的属性的新对象。

```typescript
const result = pickBy(obj, shouldPick);
```

## 参考

### `pickBy(obj, shouldPick)`

当您想基于条件函数选择性地选择对象的属性时,请使用 `pickBy`。它返回一个仅包含条件函数返回 `true` 的属性的新对象。

```typescript
import { pickBy } from 'es-toolkit/object';

// 仅选择具有字符串值的属性
const obj = { a: 1, b: 'select', c: 3, d: 'also select' };
const result = pickBy(obj, value => typeof value === 'string');
// result 是 { b: 'select', d: 'also select' }

// 仅选择偶数值
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const evens = pickBy(numbers, value => value % 2 === 0);
// evens 是 { b: 2, d: 4 }

// 同时使用键和值
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const admins = pickBy(data, (value, key) => key.startsWith('admin') && value > 25);
// admins 是 { admin1: 30, admin2: 28 }
```

#### 参数

- `obj` (`T extends Record<string, any>`): 要过滤属性的对象。
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): 决定是否选择属性的条件函数。接收值和键,返回 `true` 表示选择,返回 `false` 表示排除。

#### 返回值

(`Partial<T>`): 返回一个仅包含满足条件函数的属性的新对象。
