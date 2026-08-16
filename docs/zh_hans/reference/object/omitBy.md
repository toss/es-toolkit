# omitBy

返回一个排除满足条件函数的属性的新对象。

```typescript
const result = omitBy(obj, shouldOmit);
```

## 用法

### `omitBy(obj, shouldOmit)`

当您想基于条件函数选择性地排除对象的属性时,请使用 `omitBy`。它返回一个新对象,该对象仅包含条件函数返回 `false` 的属性,排除返回 `true` 的属性。

```typescript
import { omitBy } from 'es-toolkit/object';

// 排除具有字符串值的属性
const obj = { a: 1, b: 'remove', c: 3, d: 'also remove' };
const result = omitBy(obj, value => typeof value === 'string');
// result 是 { a: 1, c: 3 }

// 仅排除偶数值
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const odds = omitBy(numbers, value => value % 2 === 0);
// odds 是 { a: 1, c: 3 }

// 同时使用键和值
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const nonAdmins = omitBy(data, (value, key) => key.startsWith('admin'));
// nonAdmins 是 { user1: 25, user2: 17 }
```

#### 参数

- `obj` (`T extends Record<string, any>`): 要过滤属性的对象。
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): 决定是否排除属性的条件函数。接收值和键,返回 `true` 表示排除,返回 `false` 表示保留。

#### 返回值

(`Partial<T>`): 返回一个由不满足条件函数的属性组成的新对象。
