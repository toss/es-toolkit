# rangeRight

在指定范围和步长内创建反向数字数组。

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end, step?);
```

## 参考

### `rangeRight(end)`

当您需要从结束值到 0 的反向连续数字数组时使用 `rangeRight`。它与 `range` 类似,但结果是从后面开始的。

```typescript
import { rangeRight } from 'es-toolkit/math';

// 创建从 3 到 0 的反向数组。
const numbers1 = rangeRight(4);
console.log(numbers1); // [3, 2, 1, 0]

// 数组的反向索引
const items = ['a', 'b', 'c', 'd', 'e'];
const reverseIndices = rangeRight(items.length);
reverseIndices.forEach(i => {
  console.log(items[i]); // 按 'e', 'd', 'c', 'b', 'a' 顺序输出
});
```

#### 参数

- `end` (`number`): 结束值(不包含)。从 0 开始。

#### 返回值

(`number[]`): 返回从结束值到 0 生成的反向数字数组。

### `rangeRight(start, end, step?)`

当您需要具有指定起始值、结束值和步长的反向连续数字数组时使用 `rangeRight`。它与 `range` 类似,但结果是从后面开始的。

```typescript
import { rangeRight } from 'es-toolkit/math';

// 创建从 4 到 1 的反向数组。
const numbers2 = rangeRight(1, 5);
console.log(numbers2); // [4, 3, 2, 1]

// 创建从 15 到 0 以 5 递减的数组。
const numbers3 = rangeRight(0, 20, 5);
console.log(numbers3); // [15, 10, 5, 0]

// 也可以向负方向移动。
const numbers4 = rangeRight(-5, 0, 1);
console.log(numbers4); // [-1, -2, -3, -4, -5]

// 也可以从小数到大数。
const numbers5 = rangeRight(5, 0, -1);
console.log(numbers5); // [1, 2, 3, 4, 5]
```

在需要倒计时或分页中的反向顺序时很有用。

```typescript
import { rangeRight } from 'es-toolkit/math';

// 创建倒计时
const countdown = rangeRight(0, 11);
console.log(countdown); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// 分页中从最后一页到第一页
const pageNumbers = rangeRight(1, 11);
console.log(pageNumbers); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### 参数

- `start` (`number`): 起始值。包含在结果数组中。
- `end` (`number`): 结束值。不包含在结果数组中。
- `step` (`number`, 可选): 每个数字之间的增量。必须是非零整数。默认值为 `1`。

#### 返回值

(`number[]`): 返回使用指定范围和步长生成的反向数字数组。

#### 抛出异常

- 如果 `step` 为 0 或不是整数,则抛出错误。
