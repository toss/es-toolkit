# mapKeys (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `mapKeys`

这个 `mapKeys` 函数由于处理 `null` 或 `undefined` 以及 `iteratee` 转换过程而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`mapKeys`](../../object/mapKeys.md)。

:::

通过转换键来创建新对象,同时保持值不变。

```typescript
const result = mapKeys(obj, iteratee);
```

## 参考

### `mapKeys(object, iteratee)`

使用 `iteratee` 函数转换对象中的每个键来创建新对象。值保持不变,只修改键。适用于转换或规范化对象键。

```typescript
import { mapKeys } from 'es-toolkit/compat';

// 为键添加前缀
const obj = { a: 1, b: 2, c: 3 };
const result = mapKeys(obj, (value, key) => 'prefix_' + key);
// 结果: { prefix_a: 1, prefix_b: 2, prefix_c: 3 }

// 将键转换为大写
const data = { name: 'John', age: 30 };
const uppercased = mapKeys(data, (value, key) => key.toUpperCase());
// 结果: { NAME: 'John', AGE: 30 }

// 将数组索引转换为键
const arr = ['apple', 'banana', 'orange'];
const indexed = mapKeys(arr, (value, index) => `item_${index}`);
// 结果: { item_0: 'apple', item_1: 'banana', item_2: 'orange' }

// 通过组合键和值创建新键
const scores = { math: 90, science: 85, english: 92 };
const detailed = mapKeys(scores, (value, key) => `${key}_score_${value}`);
// 结果: { math_score_90: 90, science_score_85: 85, english_score_92: 92 }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { mapKeys } from 'es-toolkit/compat';

mapKeys(null, iteratee); // {}
mapKeys(undefined, iteratee); // {}
```

#### 参数

- `object` (`ArrayLike<T> | T | null | undefined`): 要转换键的对象或数组。
- `iteratee` (`ListIteratee<T> | ObjectIteratee<T>`, 可选): 用于转换每个键的函数。默认为 `identity` 函数。

#### 返回值

(`Record<string, T> | Record<string, T[keyof T]>`): 返回一个具有转换后键的新对象。
