# pickBy

返回一个仅包含满足条件函数的属性的新对象。

```typescript
const result = pickBy(obj, shouldPick);
```

## 用法

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

返回一个仅包含满足条件函数的属性的新对象。返回类型取决于 `obj` 是否有索引签名。

- 如果 `obj` 有**字符串或数字索引签名**（例如 `Record<string, number>`）：返回 `T` — 这类类型本来就允许任何键不存在，因此结果可以直接传给需要原对象的地方。
- 否则（例如 `{ a: number; b: string }`）：返回 `Partial<T>` — 因为已知属性中的任何一个都可能已被排除。
