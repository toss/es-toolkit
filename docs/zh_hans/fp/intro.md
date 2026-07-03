# es-toolkit/fp

`es-toolkit/fp` 是 es-toolkit 的函数式编程入口。它让你可以用 [`pipe`](./reference/pipe.md) 把数据转换表达为一条可读的、自上而下的流水线,而不必嵌套调用或反复使用临时变量。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## 为什么选择 es-toolkit/fp

- **可读** — 各步骤按执行顺序自上而下阅读。不必再从内向外解析 `take(map(filter(xs)))`,也不需要步骤之间的临时变量。
- **快速** — 连续的步骤会被融合为一次遍历:步骤之间不构建中间数组,结果一旦收集够就立即停止遍历。具体原理可以在下面的[惰性求值](#惰性求值)中直接看到。
- **没有代价** — 当融合无法带来收益时,`pipe` 会直接走原生数组方法,因此它永远不会比 `xs.filter().map()` 更慢——只会在某些场景下快得多。

## es-toolkit/fp 函数的工作方式

每个 `es-toolkit/fp` 函数都会先传入它的配置(例如 `map(fn)` 或 `take(2)`),并返回一个接收数据的函数。`pipe` 会提供这份数据,把每一步的结果串联到下一步。

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

正因为每一步都是这样一个"等待数据的函数",`pipe` 才能在开始执行之前看到整条流水线的形状。这正是惰性求值的起点。

## 惰性求值

前面说的"快速",秘诀就在惰性求值。当多个支持惰性求值的函数(`map`、`filter`、`take`……)连续出现时,`pipe` 会把它们融合为一次遍历:不再是整个数组逐步通过每个步骤,而是每个元素一次性走完所有步骤。这样步骤之间不会产生中间数组,末尾的 `take` 一旦满足,整个遍历就立即停止。

下面两个面板运行的是**同一条流水线**。**Eager** 在每一步都处理整个数组,并且每次都分配一个新数组;**Lazy fusion** 让元素逐个走完所有步骤,并在 `take(2)` 满足后立即停止——`5` 和 `6` 从未被访问,也没有构建任何中间数组。

<FpLazySimulation />

输入越大、`take` 越早满足,这种差距就越明显——这是遍历整个数组与只触及数组前部之间的差别:

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

pipe(
  hugeArray,
  map(expensiveTransform),
  filter(complexPredicate),
  // 一旦收集到 2 个结果就停止;`hugeArray` 的大部分元素都不会被访问。
  take(2)
);
```

## 与 es-toolkit 的关系

`es-toolkit/fp` 复用了 `es-toolkit` 的实现;它只改变了你的调用方式——在 `pipe` 内部调用。如果你更喜欢直接调用,请使用 [`es-toolkit`](/zh_hans/intro)。如果你想在迁移时与 Lodash 的调用方式保持一致,请使用 [`es-toolkit/compat`](/zh_hans/compat/intro)。
