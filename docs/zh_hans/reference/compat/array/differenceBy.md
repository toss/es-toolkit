# differenceBy（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 `differenceBy`

此 `differenceBy` 函数由于复杂的参数处理和迭代器转换而运行较慢。

请使用 `es-toolkit` 中更快、更现代的 [differenceBy](../../array/differenceBy.md)。

:::

根据迭代函数转换的值,从第一个数组中排除其他数组的元素,求差集。

```typescript
const result = differenceBy(array, ...values, iteratee);
```

## 参考

### `differenceBy(array, ...values, iteratee)`

当你想要将第一个数组的每个元素和要排除的数组的元素通过迭代函数转换后,删除产生相同值的元素时,使用 `differenceBy`。在对象数组中按特定属性值或转换值进行比较时很有用。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 按向下取整比较
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// Returns: [1.2] (因为Math.floor(2.1) === Math.floor(2.3),所以排除2.1)

// 按字符串长度比较
differenceBy(['one', 'two', 'three'], ['four', 'eight'], 'length');
// Returns: ['one', 'two'] (因为three和eight长度相同,所以排除three)

// 按对象属性比较
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [{ id: 1, name: 'Different Alice' }];
differenceBy(users1, users2, 'id');
// Returns: [{ id: 2, name: 'Bob' }] (排除id为1的对象)
```

可以一次排除多个数组。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 从多个数组中排除
differenceBy([2.1, 1.2, 3.5], [2.3], [1.4], [3.2], Math.floor);
// Returns: [] (所有元素都被排除)

// 按长度比较字符串数组
differenceBy(['a', 'bb', 'ccc'], ['x'], ['yy'], ['zzz'], 'length');
// Returns: [] (长度1、2、3都被排除)
```

没有迭代函数时,像普通 `difference` 一样工作。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 不使用迭代函数
differenceBy([1, 2, 3], [2, 4]);
// Returns: [1, 3]
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { differenceBy } from 'es-toolkit/compat';

differenceBy(null, [1, 2], Math.floor);
// Returns: []

differenceBy(undefined, [1, 2], x => x);
// Returns: []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 求差集的基准数组。
- `values` (`...ArrayLike<T>[]`): 包含要排除的值的数组。
- `iteratee` (`ValueIteratee<T>`): 将每个元素转换为比较值的函数。可以使用函数、属性名或部分对象。

#### 返回值

(`T[]`): 返回根据迭代函数转换的值排除元素后的新数组。
