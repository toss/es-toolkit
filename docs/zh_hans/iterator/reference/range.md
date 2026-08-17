# range (`Iterator`)

惰性地产生一个具有固定步长的数字序列。

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

## 用法

### `range(end)` / `range(start, end)` / `range(start, end, step)`

使用 `range` 生成数字序列而无需分配数组。只传一个参数时,它从 `0` 开始以步长 `1` 数到 `end`(不含);传两个参数时,从 `start`(含)开始;第三个参数设置步长,步长可以为负,用于递减计数。与 `es-toolkit/math` 中基于数组的 [`range`](../../reference/math/range.md) 不同,在迭代器被消费之前不会计算任何数字,因此 `range(0, Infinity)` 是编写无上限计数器的实用方式。

```typescript
import { range } from 'es-toolkit/iterator';

// 从 0 数到终点(不含)。
range(4).toArray();
// 返回: [0, 1, 2, 3]

// 指定起点和终点。
range(1, 4).toArray();
// 返回: [1, 2, 3]

// 自定义步长,包括负步长。
range(0, 20, 5).toArray();
// 返回: [0, 5, 10, 15]
range(0, -4, -1).toArray();
// 返回: [0, -1, -2, -3]

// 无上限的计数器,用 take 限制。
range(0, Infinity).take(3).toArray();
// 返回: [0, 1, 2]
```

#### 参数

- `start` (`number`): 范围的起始数字(含)。只提供一个参数时默认为 `0`。
- `end` (`number`): 范围的结束数字(不含)。
- `step` (`number`, 可选): 数字之间的步长;必须是非零整数。默认为 `1`。

#### 返回值

(`IteratorObject<number, undefined>`): 一个产生范围内数字的惰性迭代器。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

#### 异常

如果 `step` 不是非零整数,则抛出错误。
