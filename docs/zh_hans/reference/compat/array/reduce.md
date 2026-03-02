# reduce (Lodash 兼容性)

::: warning 使用 `Array.prototype.reduce` 或 `Object.values` 与 `reduce`

此 `reduce` 函数由于复杂的类型处理和支持各种输入格式而运行较慢。

请改用更快、更现代的 `Array.prototype.reduce` 方法,或对于对象,与 `Object.values` 一起使用。

:::

将数组或对象归约为单个值。

```typescript
const result = reduce(collection, iteratee, initialValue);
```

## 用法

### `reduce(collection, iteratee, initialValue)`

遍历数组或对象的所有元素以计算累积值。如果提供初始值,则从该值开始;否则从第一个元素开始。

```typescript
import { reduce } from 'es-toolkit/compat';

// 计算数组总和
const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value, 0);
console.log(sum); // 10

// 计算对象值的总和
const scores = { math: 95, english: 87, science: 92 };
const totalScore = reduce(scores, (acc, value) => acc + value, 0);
console.log(totalScore); // 274
```

如果不提供初始值,第一个元素将成为初始值,并从第二个元素开始迭代。

```typescript
import { reduce } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (1 + 2 + 3 + 4)

// 空数组返回 undefined
const empty = [];
const result = reduce(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### 参数

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 要迭代的数组或对象。
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): 对每个元素调用的函数。它接收累积值、当前值、索引/键和原始数组/对象。
- `initialValue` (`any`, 可选): 累加器的初始值。如果未提供,第一个元素将成为初始值。

#### 返回值

(`any`): 返回处理所有元素后的最终累积值。
