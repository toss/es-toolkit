# intersectionWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [intersectionWith](../../array/intersectionWith.md)

此 `intersectionWith` 函数由于处理 `null` 或 `undefined`、支持各种重载等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [intersectionWith](../../array/intersectionWith.md)。

:::

使用自定义比较函数创建在所有数组中找到的共同元素的数组。

```typescript
const result = intersectionWith(array, ...otherArrays, comparator);
```

## 参考

### `intersectionWith(array, ...otherArrays, comparator)`

使用自定义比较函数查找第一个数组与其余数组的交集。比较函数确定元素是否相等，只返回在所有数组中找到的元素。

```typescript
import { intersectionWith } from 'es-toolkit/compat';

const objects = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const others = [
  { id: 1, name: 'john' },
  { id: 3, name: 'joe' },
];

intersectionWith(objects, others, (a, b) => a.id === b.id);
// => [{ id: 1, name: 'john' }]

// 您可以与多个数组进行比较
const array1 = [{ x: 1 }, { x: 2 }];
const array2 = [{ x: 1 }, { x: 3 }];
const array3 = [{ x: 1 }, { x: 4 }];

intersectionWith(array1, array2, array3, (a, b) => a.x === b.x);
// => [{ x: 1 }]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { intersectionWith } from 'es-toolkit/compat';

intersectionWith(null, [1, 2], (a, b) => a === b); // []
intersectionWith([1, 2], undefined, (a, b) => a === b); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要比较的第一个数组。
- `...otherArrays` (`Array<ArrayLike<U> | ((a: T, b: T | U) => boolean)>`): 要比较的其他数组和作为最后一个元素的比较函数。
- `comparator` (`(a: T, b: T | U) => boolean`): 确定两个元素是否相等的函数。

#### 返回值

(`T[]`): 返回在所有数组中共同找到的元素的新数组。
