# intersection (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [intersection](../../array/intersection.md)

此 `intersection` 函数由于处理 `null` 或 `undefined`、多数组支持、去重过程等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [intersection](../../array/intersection.md)。

:::

查找多个数组的交集。

```typescript
const result = intersection(...arrays);
```

## 用法

### `intersection(...arrays)`

查找在所有数组中都存在的元素，并将它们作为新数组返回。结果已去重并保持第一个数组的顺序。

```typescript
import { intersection } from 'es-toolkit/compat';

// 两个数组的交集
const array1 = [1, 2, 3, 4];
const array2 = [2, 3, 5, 6];
const result = intersection(array1, array2);
// result 为 [2, 3]

// 三个数组的交集
const array3 = [3, 4, 7, 8];
const multiResult = intersection(array1, array2, array3);
// multiResult 为 [3]

// 字符串数组
const strings1 = ['a', 'b', 'c'];
const strings2 = ['b', 'c', 'd'];
const stringResult = intersection(strings1, strings2);
// stringResult 为 ['b', 'c']

// 类数组对象
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, 2: 4, length: 3 };
const likeResult = intersection(arrayLike1, arrayLike2);
// likeResult 为 [2, 3]
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3];
const result1 = intersection(array1, null);
// result1 为 []

const result2 = intersection(null, undefined);
// result2 为 []
```

重复元素会从结果中删除。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 1, 2, 3];
const array2 = [1, 2, 2, 4];
const result = intersection(array1, array2);
// result 为 [1, 2]（已去重）
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要查找交集的数组。也允许类数组对象、null 或 undefined。

#### 返回值

(`T[]`): 返回在所有数组中都存在的元素的新数组。已去重并遵循第一个数组的顺序。
