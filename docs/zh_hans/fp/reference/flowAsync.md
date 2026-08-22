# flowAsync (函数式编程)

执行从左到右的异步函数组合,返回一个会等待每个中间结果的可复用异步函数。

```typescript
const fn = flowAsync(...functions);
const result = await fn(...args);
```

::: info

`flowAsync` 是 [`flow`](./flow.md) 的 Promise 感知版本。`flow` 会将每个函数的原始返回值直接传给下一个函数,因此返回的 `Promise` 会以未解决的状态被传递;`flowAsync` 会等待每一步,让同步函数和异步函数可以在一条链中自由混用。

:::

## 用法

`flowAsync` 接收一系列函数,并将它们从左到右组合成一个异步函数。第一个函数可以接收任意数量的参数,其后的每个函数都是一元的,接收上一个函数结果被等待后的值。组合出的函数始终返回 `Promise`。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const fetchUser = async (id: number) => ({ id, name: 'Alice' });
const getName = (user: { name: string }) => user.name;

const getUserName = flowAsync(fetchUser, getName);

await getUserName(1); // => 'Alice'
```

同步函数和异步函数可以以任意顺序混用;每个结果在传给下一个函数之前都会被等待。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const process = flowAsync(
  (x: number) => x + 1,
  async x => x * 3,
  x => `value: ${x}`
);

await process(1); // => 'value: 6'
```

如果任何函数抛出错误或返回被拒绝的 `Promise`,组合出的函数就会以该错误拒绝。只需在调用处使用一个 `try`/`catch`(或 `.catch`),就能处理每一步的失败。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const risky = flowAsync(
  async (id: number) => {
    throw new Error(`user ${id} not found`);
  },
  (user: { name: string }) => user.name
);

await risky(1); // 以 Error: user 1 not found 拒绝
```

#### 参数

- `functions`: 从左到右组合的函数。第一个函数可以接收任意数量的参数,其余函数都是一元的,接收上一个函数输出被等待后的值。

#### 返回值

(`(...args: any[]) => Promise<unknown>`): 一个依次应用所有函数并等待每个结果的新异步函数。它接收与第一个函数相同的参数,并解决为最后一个函数结果被等待后的值。公开的重载会从整条链中推断出精确的类型。
