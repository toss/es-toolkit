# uniqBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [uniqBy](../../array/uniqBy.md)

此 `uniqBy` 函数由于处理 `null` 或 `undefined`、复杂参数类型处理等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [uniqBy](../../array/uniqBy.md)。

:::

根据转换函数返回的值去除重复项来创建一个唯一元素的新数组。

```typescript
const result = uniqBy(array, iteratee);
```

## 用法

### `uniqBy(array, iteratee)`

对数组的每个元素应用转换函数,并仅保留转换结果相同的元素中的第一个元素。这在根据对象数组中的特定属性或数字数组中的特定计算结果去除重复项时很有用。

```typescript
import { uniqBy } from 'es-toolkit/compat';

// 在数字数组中通过 Math.floor 结果去除重复项
uniqBy([2.1, 1.2, 2.3], Math.floor);
// 返回: [2.1, 1.2]

// 在对象数组中通过属性去除重复项
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x');
// 返回: [{ x: 1 }, { x: 2 }]

// 使用函数去除重复项
uniqBy([{ name: 'John' }, { name: 'Jane' }, { name: 'John' }], obj => obj.name);
// 返回: [{ name: 'John' }, { name: 'Jane' }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { uniqBy } from 'es-toolkit/compat';

uniqBy(null, Math.floor); // []
uniqBy(undefined, 'x'); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要去除重复项的数组。
- `iteratee` (`ValueIteratee<T>`): 要应用于每个元素的转换函数。可以是函数、属性名称、部分对象等。

#### 返回值

(`T[]`): 返回一个根据转换函数结果去除重复项的新数组。
