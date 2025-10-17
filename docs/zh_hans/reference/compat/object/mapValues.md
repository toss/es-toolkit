# mapValues (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `mapValues`

这个 `mapValues` 函数由于处理 `null` 或 `undefined` 以及 `iteratee` 转换过程而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`mapValues`](../../object/mapValues.md)。

:::

通过转换值来创建新对象,同时保持键不变。

```typescript
const result = mapValues(obj, iteratee);
```

## 参考

### `mapValues(object, iteratee)`

使用 `iteratee` 函数转换对象中的每个值来创建新对象。键保持不变,只修改值。可以处理字符串、数组和对象。适用于转换或计算数据。

```typescript
import { mapValues } from 'es-toolkit/compat';

// 转换对象值
const obj = { a: 1, b: 2, c: 3 };
const doubled = mapValues(obj, value => value * 2);
// 结果: { a: 2, b: 4, c: 6 }

// 将字符串转换为大写
const names = { first: 'john', last: 'doe' };
const uppercased = mapValues(names, value => value.toUpperCase());
// 结果: { first: 'JOHN', last: 'DOE' }

// 转换字符串中的每个字符
const str = 'abc';
const charMap = mapValues(str, char => char.toUpperCase());
// 结果: { '0': 'A', '1': 'B', '2': 'C' }

// 将数组转换为对象
const arr = [10, 20, 30];
const arrMap = mapValues(arr, (value, index) => value + index);
// 结果: { '0': 10, '1': 21, '2': 32 }

// 使用属性路径提取值
const users = {
  user1: { profile: { name: 'Alice' } },
  user2: { profile: { name: 'Bob' } },
};
const userNames = mapValues(users, 'profile.name');
// 结果: { user1: 'Alice', user2: 'Bob' }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { mapValues } from 'es-toolkit/compat';

mapValues(null, iteratee); // {}
mapValues(undefined, iteratee); // {}
```

#### 参数

- `object` (`string | T[] | T | null | undefined`): 要转换值的对象、数组或字符串。
- `iteratee` (`ValueIteratee<any>`, 可选): 用于转换每个值的函数、属性路径或匹配对象。默认为 `identity` 函数。

#### 返回值

(`Record<number, T> | { [P in keyof T]: U } | Record<string, boolean> | Record<string, any> | Partial<T>`): 返回一个具有转换后值的新对象。
