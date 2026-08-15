# flow (函数式编程)

执行从左到右的函数组合,但不会立即运行,而是返回一个可复用的函数。

```typescript
const fn = flow(...functions);
const result = fn(...args);
```

::: info

`flow` 是 [`pipe`](./pipe.md) 的延迟执行版本。当你想先构建一条管道,之后再用不同的数据多次调用它时,使用 `flow`;当你已经有了值并想立即得到结果时,使用 `pipe`。

:::

## 用法

`flow` 接收一系列函数,并将它们从左到右组合成一个函数。第一个函数可以接收任意数量的参数,其后的每个函数都是一元的,接收上一个函数的结果。

它与 `pipe` 的主要区别在于:

- `pipe(value, ...functions)` 会**立即**让具体的 `value` 穿过这些函数并返回结果。
- `flow(...functions)` 返回一个**新函数**,每次调用时都会应用同样的组合,因此可以复用。

```typescript
import { flow } from 'es-toolkit/fp';

const addThenSquare = flow(
  (x: number, y: number) => x + y,
  n => n * n
);

addThenSquare(1, 2); // => 9
addThenSquare(2, 3); // => 25
```

`flow` 在内部委托给 `pipe`,因此任何 `es-toolkit/fp` 函数(或任意一元函数)都能以同样的方式嵌入,支持惰性求值的函数也会以同样的方式被融合。

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

const firstTwoEvenSquares = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

firstTwoEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

### 惰性求值

由于 `flow` 通过 `pipe` 执行,当多个支持惰性求值的函数(`map`、`filter`、`take`……)连续出现时,它们会被融合在一起,逐个元素地处理输入,而不是在每一步之后都构建一个中间数组。位于末尾的 `take` 可以提前结束遍历,这样前面的函数就不会再对剩余的输入运行——与 `pipe` 完全一致。

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

// 只会计算前两个为偶数的平方;数组的其余部分都不会被访问。
const pipeline = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

pipeline([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

#### 参数

- `functions` (`Array<(...args: any[]) => any>`): 从左到右组合的函数。第一个函数可以接收任意数量的参数,其余函数都是一元的,接收上一个函数的输出。

#### 返回值

(`(...args: any[]) => unknown`): 一个依次应用所有函数的新函数。它接收与第一个函数相同的参数,并返回最后一个函数的结果。公开的重载会从整条链中推断出精确的类型。
