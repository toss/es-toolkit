# zipWith

用自定义函数结合多个数组,创建一个新数组。

```typescript
const result = zipWith(...arrs, combine);
```

## 用法

### `zipWith(...arrs, combine)`

当您想以期望的方式结合多个数组的相同位置元素时,请使用 `zipWith`。将每个数组相同索引的元素传递给结合函数,用其结果创建新数组。

```typescript
import { zipWith } from 'es-toolkit/array';

// 将两个数字数组相加。
zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// 连接字符串。
zipWith(['a', 'b'], ['c', 'd'], ['e', 'f'], (a, b, c) => `${a}${b}${c}`);
// Returns: ['ace', 'bdf']
```

如果数组长度不同,会按最长数组的长度对齐。较短数组的空位会传递 `undefined`。

```typescript
import { zipWith } from 'es-toolkit/array';

zipWith([1, 2], [10, 20, 30], (a, b) => (a ?? 0) + (b ?? 0));
// Returns: [11, 22, 30]
```

#### 参数

- `arrs` (`Array<readonly T[]>`): 要结合的数组。
- `combine` (`(...items: [...T[], number]) => R`): 接收每个数组对应索引元素,以及索引本身,并返回新值的函数。

#### 返回值

(`R[]`): 返回应用结合函数后组成的新数组。
