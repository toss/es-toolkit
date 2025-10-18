# meanBy (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [meanBy](../../math/meanBy.md)

这个 `meanBy` 函数由于 iteratee 函数处理和类型转换会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [meanBy](../../math/meanBy.md)。

:::

计算符合条件的值的平均值。

```typescript
const average = meanBy(array, iteratee);
```

## 参考

### `meanBy(array, iteratee)`

计算数组中每个元素应用函数后结果的平均值。

```typescript
import { meanBy } from 'es-toolkit/compat';

// 对象数组中特定属性的平均值
const people = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 35 },
];

meanBy(people, person => person.age);
// Returns: 30

// 也可以使用属性名
meanBy(people, 'age');
// Returns: 30
```

用函数转换值来计算平均值。

```typescript
import { meanBy } from 'es-toolkit/compat';

const numbers = [1.5, 2.7, 3.2, 4.8];
meanBy(numbers, x => Math.floor(x));
// Returns: 2.5 (1 + 2 + 3 + 4) / 4

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
meanBy(items, x => x.a);
// Returns: 2
```

通过数组元素访问。

```typescript
import { meanBy } from 'es-toolkit/compat';

const arrays = [[2], [3], [1]];
meanBy(arrays, 0); // 第一个元素的平均值
// Returns: 2
```

只计算对象特定属性和值匹配的情况。

```typescript
import { meanBy } from 'es-toolkit/compat';

const users = [
  { name: '张三', age: 25, active: true },
  { name: '李四', age: 30, active: false },
  { name: '王五', age: 35, active: true },
];

// 只有 active 为 true 的人
meanBy(users, { active: true });
// Returns: 0.6666666 (active 为 true 的人占总人数的比例)
```

空数组返回 NaN。

```typescript
import { meanBy } from 'es-toolkit/compat';

meanBy([], x => x.a);
// Returns: NaN

meanBy(null);
// Returns: NaN

meanBy(undefined);
// Returns: NaN
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要处理的数组。
- `iteratee` (`ValueIteratee<T>`, 可选): 应用于每个元素的函数、属性名或条件。

#### 返回值

(`number`): 返回符合条件的值的平均值。如果是空数组则返回 `NaN`。
