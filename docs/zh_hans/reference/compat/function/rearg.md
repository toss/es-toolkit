# rearg (Lodash 兼容性)

::: warning 请使用箭头函数

此 `rearg` 函数创建了一个复杂的包装器来重新排列参数顺序,这可能会导致性能下降。通过使用箭头函数直接重新排列参数顺序,您可以编写更清晰、更快的代码。

请改用更快、更现代的箭头函数。

:::

创建一个新函数,按指定顺序重新排列原函数的参数。

```typescript
const rearranged = rearg(func, ...indices);
```

## 参考

### `rearg(func, ...indices)`

当您想在调用函数时更改参数顺序时,请使用 `rearg`。它会按照指定的索引顺序重新排列参数,然后调用原函数。

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting, name) => `${greeting}, ${name}!`;

// 交换参数顺序(第1个,第0个)
const rearrangedGreet = rearg(greet, 1, 0);
rearrangedGreet('World', 'Hello');
// 返回值: "Hello, World!"

// 原函数保持不变
greet('Hello', 'World');
// 返回值: "Hello, World!"
```

您也可以将索引作为数组传递。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 使用数组指定索引
const rearranged = rearg(fn, [2, 0, 1]);
rearranged('a', 'b', 'c');
// 返回值: ['c', 'a', 'b']
```

您可以只重新排列部分参数,其余参数保持原样。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// 只重新排列前两个参数
const rearranged = rearg(fn, 1, 0);
rearranged('first', 'second', 'third', 'fourth');
// 返回值: ['second', 'first', 'third', 'fourth']
```

不存在的索引会被处理为 `undefined`。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 包含不存在的索引 5
const rearranged = rearg(fn, 5, 1, 0);
rearranged('a', 'b', 'c');
// 返回值: [undefined, 'b', 'a']
```

嵌套数组也会被展平处理。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// 嵌套数组索引
const rearranged = rearg(fn, [1, [2, 0]], 3);
rearranged('a', 'b', 'c', 'd');
// 返回值: ['b', 'c', 'a', 'd']
```

#### 参数

- `func` (`(...args: any[]) => any`): 要重新排列参数的函数。
- `...indices` (`Array<number | number[]>`): 要重新排列的参数索引。也支持嵌套数组。

#### 返回值

(`(...args: any[]) => any`): 返回参数已重新排列的新函数。
