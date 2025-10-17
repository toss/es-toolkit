# pickBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `pickBy`

这个 `pickBy` 函数由于类数组对象检查、`iteratee` 转换和键转换过程而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`pickBy`](../../object/pickBy.md)。

:::

创建一个新对象,仅选择断言函数返回true的属性。

```typescript
const result = pickBy(obj, predicate);
```

## 参考

### `pickBy(object, predicate)`

对对象的每个属性执行断言函数,并创建一个新对象,仅包含断言返回true的属性。适用于根据条件动态选择属性。

```typescript
import { pickBy } from 'es-toolkit/compat';

// 仅选择特定类型的值
const data = { a: 1, b: 'keep', c: 3, d: 'select' };
const strings = pickBy(data, (value) => typeof value === 'string');
// 结果: { b: 'keep', d: 'select' }

// 根据条件选择属性
const user = { id: 1, name: 'John', age: 0, active: true, email: '' };
const validData = pickBy(user, (value) => Boolean(value));
// 结果: { id: 1, name: 'John', active: true } (仅真值)

// 按键名过滤
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = pickBy(settings, (value, key) => key.startsWith('user'));
// 结果: { userSetting: true }

// 仅选择数字属性
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const numbersOnly = pickBy(mixed, (value) => typeof value === 'number');
// 结果: { num1: 42, num2: 0 }

// 也可用于数组
const arr = [1, 2, 3, 4, 5];
const evens = pickBy(arr, (value) => value % 2 === 0);
// 结果: { '1': 2, '3': 4 } (偶数的索引和值)

// 利用值、键和原始对象
const scores = { math: 90, science: 75, english: 85, art: 60 };
const highScores = pickBy(scores, (value, key, obj) => {
  const average = Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
  return value > average;
});
// 结果: { math: 90, english: 85 }
```

不带断言函数调用时,仅选择真值。

```typescript
import { pickBy } from 'es-toolkit/compat';

const data = { a: 1, b: '', c: 0, d: 'hello', e: null, f: true };
const truthyValues = pickBy(data);
// 结果: { a: 1, d: 'hello', f: true }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { pickBy } from 'es-toolkit/compat';

pickBy(null, () => true); // {}
pickBy(undefined, () => true); // {}
```

#### 参数

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): 要过滤的源对象。
- `predicate` (`ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, 可选): 对每个属性执行的断言函数。此函数返回true的属性将被选择。默认为 `identity` 函数。

#### 返回值

(`Record<string, S> | Record<number, S> | Partial<T>`): 返回一个由满足条件的属性组成的新对象。
