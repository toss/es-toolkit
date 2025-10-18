# windowed

指定大小的窗口沿着数组均匀滑动,返回包含每个窗口快照的新数组。

```typescript
const windows = windowed(arr, size, step?, options?);
```

## 参考

### `windowed(arr, size, step?, options?)`

当您想让指定大小的窗口沿着数组均匀滑动并返回包含每个窗口快照的数组时,请使用 `windowed`。

在时间序列数据分析中计算移动平均值、从字符串中提取 n-gram、或在数组中查找特定模式时很有用。也可以用于按批次处理数据或实现滑动窗口算法。

```typescript
import { windowed } from 'es-toolkit/array';

// 基本用法 - 创建大小为3的窗口。
const numbers = [1, 2, 3, 4, 5];
const result = windowed(numbers, 3);
console.log(result); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// 指定step来调整窗口间隔。
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const stepped = windowed(data, 3, 2);
console.log(stepped); // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]

// 也可以用于字符串数组。
const words = ['a', 'b', 'c', 'd', 'e'];
const wordWindows = windowed(words, 2);
console.log(wordWindows); // [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']]
```

如果想包含部分窗口,请使用 `partialWindows` 选项。

```typescript
import { windowed } from 'es-toolkit/array';

const numbers = [1, 2, 3, 4, 5, 6];

// 不包含部分窗口(默认)
const complete = windowed(numbers, 4, 3);
console.log(complete); // [[1, 2, 3, 4]]

// 包含部分窗口
const withPartial = windowed(numbers, 4, 3, { partialWindows: true });
console.log(withPartial); // [[1, 2, 3, 4], [4, 5, 6]]
```

每个快照以数组形式提供,最后几个数组可能包含的元素少于指定大小。

```typescript
import { windowed } from 'es-toolkit/array';

const small = [1, 2];

// 当窗口大于数组时
console.log(windowed(small, 5)); // []
console.log(windowed(small, 5, 1, { partialWindows: true })); // [[1, 2], [2]]
```

#### 参数

- `arr` (`readonly T[]`): 要创建窗口的数组。
- `size` (`number`): 每个窗口的大小。必须是大于1的整数。
- `step` (`number`, 可选): 窗口之间的间隔。必须是大于1的整数,默认值为 `1`。
- `options.partialWindows` (`boolean`, 可选): 是否在数组末尾包含不完整的窗口。默认值为 `false`。

#### 返回值

(`T[][]`): 以指定大小和间隔创建的窗口数组。

#### 错误

- 当 `size` 或 `step` 不是正整数时会抛出错误。
