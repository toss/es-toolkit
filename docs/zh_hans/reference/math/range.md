# range

在指定范围和步长内创建数字数组。

```typescript
const numbers = range(end);
const numbers = range(start, end, step);
```

## 参考

### `range(end)`

当您需要从 0 到指定结束值的连续数字数组时使用 `range`。它在循环中很有用。

```typescript
import { range } from 'es-toolkit/math';

// 创建从 0 到 3 的数组。
const numbers1 = range(4);
console.log(numbers1); // [0, 1, 2, 3]

// 具有 10 个元素的数组的索引
const indices = range(10);
console.log(indices); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 可以代替 forEach 使用。
range(5).forEach(i => {
  console.log(`迭代 ${i}`); // 迭代 0, 迭代 1, 迭代 2, 迭代 3, 迭代 4
});
```

#### 参数

- `end` (`number`): 结束值(不包含)。从 0 开始。

#### 返回值

(`number[]`): 返回从 0 到结束值生成的数字数组。

### `range(start, end, step?)`

当您需要具有指定起始值、结束值和步长的连续数字数组时使用 `range`。它在循环中很有用。

```typescript
import { range } from 'es-toolkit/math';

// 创建从 1 到 4 的数组。
const numbers2 = range(1, 5);
console.log(numbers2); // [1, 2, 3, 4]

// 创建从 0 到 20 以 5 递增的数组。
const numbers3 = range(0, 20, 5);
console.log(numbers3); // [0, 5, 10, 15]

// 也可以向负方向移动。
const numbers4 = range(0, -5, -1);
console.log(numbers4); // [0, -1, -2, -3, -4]

// 也可以从大数到小数。
const numbers5 = range(5, 0, -1);
console.log(numbers5); // [5, 4, 3, 2, 1]

// 创建特定范围的页码
const pageNumbers = range(1, 11);
console.log(pageNumbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### 参数

- `start` (`number`): 起始值。包含在结果数组中。
- `end` (`number`): 结束值。不包含在结果数组中。
- `step` (`number`, 可选): 每个数字之间的增量。必须是非零整数。默认值为 `1`。

#### 返回值

(`number[]`): 返回使用指定范围和步长生成的数字数组。

#### 抛出异常

- 如果 `step` 为 0 或不是整数,则抛出错误。
