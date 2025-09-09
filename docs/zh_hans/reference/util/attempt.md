# attempt

::: info
重要提示：此函数不适用于异步函数（返回`Promise`的函数）。
当传递异步函数时，它将返回`[null, Promise<T>]`，但如果Promise稍后被拒绝，则不会捕获任何错误。

对于异步函数，建议使用`attemptAsync`函数代替。
:::

尝试执行函数并返回包含结果或错误的元组。

## 签名

```typescript
function attempt<T, E>(func: () => T): [null, T] | [E, null];
```

### 参数

- `func` (`() => T`): 尝试执行的函数。

### 返回值

(`[null, T] | [E, null]`): 一个元组，其中:

- 成功时: `[null, T]` - 第一个元素为`null`，第二个为结果。
- 出错时: `[E, null]` - 第一个元素为捕获的错误，第二个为`null`。

## 示例

```typescript
import { attempt } from 'es-toolkit/util';

// 成功时返回 [null, 函数返回值] 元组。
const [error, result] = attempt(() => 42);
// [null, 42]

// 出错时返回 [函数抛出的错误, null] 元组。
const [error, result] = attempt(() => {
  throw new Error('出现了问题');
});
// [Error, null]

// 使用泛型类型可以指定错误和返回值的类型。
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// `error` 被推断为 `Error` 类型，`names` 被推断为 `string[]` 类型。
```
