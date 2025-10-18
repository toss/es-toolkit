# transform (Lodash 兼容性)

::: warning 请使用 `reduce` 或 `Object.entries`

此 `transform` 函数由于复杂的内部逻辑而运行缓慢。在大多数情况下,可以使用 JavaScript 的内置方法更简单地实现。

请使用更快、更现代的 `reduce` 或 `Object.entries`。

:::

遍历数组或对象,使用累加器累积值以创建新值。

```typescript
const result = transform(object, iteratee, accumulator);
```

## 参考

### `transform(object, iteratee, accumulator)`

当您想遍历数组或对象的每个元素,在累加器中累积值时,请使用 `transform`。当 `iteratee` 函数返回 `false` 时,迭代停止。

```typescript
import { transform } from 'es-toolkit/compat';

// 转换数组
const numbers = [2, 3, 4];
const doubled = transform(
  numbers,
  (acc, value) => {
    acc.push(value * 2);
  },
  []
);
// 返回: [4, 6, 8]

// 转换对象
const obj = { a: 1, b: 2, c: 1 };
const grouped = transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
);
// 返回: { '1': ['a', 'c'], '2': ['b'] }
```

如果省略累加器,将自动创建空数组或空对象。

```typescript
import { transform } from 'es-toolkit/compat';

// 对于数组会创建空数组
const result1 = transform([1, 2, 3], (acc, value) => {
  acc.push(value * 2);
});
// 返回: [2, 4, 6]

// 对于对象会创建空对象
const result2 = transform({ a: 1, b: 2 }, (acc, value, key) => {
  acc[key] = value * 2;
});
// 返回: { a: 2, b: 4 }
```

可以通过在 `iteratee` 函数中返回 `false` 来停止迭代。

```typescript
import { transform } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
const result = transform(
  numbers,
  (acc, value) => {
    if (value > 3) {
      return false; // 停止迭代
    }
    acc.push(value * 2);
  },
  []
);
// 返回: [2, 4, 6] (4 和 5 未处理)
```

如果省略 `iteratee` 函数,则复制原始值。

```typescript
import { transform } from 'es-toolkit/compat';

const array = [1, 2, 3];
const copy1 = transform(array);
// 返回: [1, 2, 3]

const obj = { a: 1, b: 2 };
const copy2 = transform(obj);
// 返回: { a: 1, b: 2 }
```

#### 参数

- `object` (`readonly T[] | T`, 可选): 要迭代的数组或对象。
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown`, 可选): 为每个元素执行的函数。返回 `false` 会停止迭代。默认为 `identity` 函数。
- `accumulator` (`U`, 可选): 初始值。如果省略,数组会创建空数组,对象会创建空对象。

#### 返回值

(`U | any[] | Record<string, any>`): 返回累积的结果。
