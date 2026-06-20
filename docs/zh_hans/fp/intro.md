# es-toolkit/fp

`es-toolkit/fp` 是 es-toolkit 的函数式编程入口。它让你可以用 [`pipe`](/zh_hans/fp/reference/pipe) 把数据转换写成一条自上而下、易于阅读的管道,而不必嵌套调用或来回处理临时变量。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## 数据在后的运算符

`es-toolkit/fp` 中的每个运算符都是**数据在后(data-last)**的:你先用它的配置来调用(例如 `map(fn)` 或 `take(2)`),得到一个等待数据的函数。`pipe` 会提供这些数据,把每一步的结果传递给下一步。

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

## 惰性求值

当多个支持惰性求值的运算符(`map`、`filter`、`take`……)连续出现时,`pipe` 会把它们融合成对数据的一次遍历,并且一次只处理一个元素。位于末尾的 `take` 随后可以提前结束遍历,这样前面的运算符就不会再对剩余的输入运行。

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

在惰性求值期间,回调函数的第三个参数(数据数组)只包含到目前为止已处理的元素,而不是完整的输入。

## 与 es-toolkit 的关系

`es-toolkit/fp` 复用了 `es-toolkit` 的实现;它只改变了你的调用方式——数据在后,并放在 `pipe` 中。如果你更喜欢直接调用,请使用 [`es-toolkit`](/zh_hans/intro)。如果你在迁移时希望与 Lodash 的调用方式保持一致,请使用 [`es-toolkit/compat`](/zh_hans/compat/intro)。
