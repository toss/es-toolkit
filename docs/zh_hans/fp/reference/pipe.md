# pipe (函数式编程)

执行从左到右的函数组合,让一个值依次穿过一系列函数。

```typescript
const result = pipe(value, ...functions);
```

::: info

`pipe` 是 `es-toolkit/fp` 中开始组合的入口。当你想让一个值从左到右依次经过多个转换时使用它。

:::

## 用法

`pipe` 是 `es-toolkit/fp` 的入口。它接收一个初始值 `value`,并按顺序对其应用每个函数,把一个函数的结果作为下一个函数的输入。它的阅读顺序自上而下,与转换的执行顺序一致,从而消除了嵌套和临时变量。

每个 `es-toolkit/fp` 函数都会返回一个接收数据的函数,因此可以直接嵌入到 `pipe` 中。

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

任何一元函数都可以在 `pipe` 中使用,而不仅限于 es-toolkit 的函数。

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### 惰性求值

当多个支持惰性求值的函数(`map`、`filter`、`take`……)连续出现时,`pipe` 会把它们融合在一起,逐个元素地处理输入,而不是在每一步之后都构建一个中间数组。位于末尾的 `take` 可以提前结束遍历,这样前面的函数就不会再对剩余的输入运行。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

// 只会计算前两个为偶数的平方;数组的其余部分都不会被访问。
pipe(
  [1, 2, 3, 4, 5, 6, 7, 8],
  map(x => x * x),
  filter(x => x % 2 === 0),
  take(2)
); // => [4, 16]
```

#### 参数

- `value` (`T`): 送入管道的初始值。
- `functions` (`Array<(input: any) => any>`): 从左到右依次应用的函数。每个函数都会接收上一个函数的输出。

#### 返回值

(`unknown`): 依次对 `value` 应用每个函数后的结果。公开的重载会从整条链中推断出精确的类型。
