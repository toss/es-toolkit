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

## es-toolkit/fp 函数的工作方式

每个 `es-toolkit/fp` 函数都会先传入它的配置(例如 `map(fn)` 或 `take(2)`),并返回一个接收数据的函数。`pipe` 会提供这份数据,把每一步的结果串联到下一步。

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

## 惰性求值

当多个支持惰性求值的函数(`map`、`filter`、`take`……)连续出现时,`pipe` 会把它们融合为对数据的一次遍历,并逐个处理元素。位于末尾的 `take` 随后可以提前结束遍历,这样前面的函数就不会再对剩余的输入运行。

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
