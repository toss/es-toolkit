# attempt

::: info
重要提示：此函数不适用于异步函数（返回`Promise`的函数）。
当传递异步函数时，它将返回`[null, Promise<AttemptResult>]`，但如果Promise稍后被拒绝，则不会捕获任何错误。

对于异步函数，请使用`attemptAsync`函数代替。
:::

尝试执行函数并返回包含结果或错误的元组。

## 签名

```typescript
function attempt<AttemptResult, AttemptError>(func: () => AttemptResult): [null, AttemptResult] | [AttemptError, null];
```

### 参数

- `func` (`() => AttemptResult`): 尝试执行的函数。

### 返回

(`[null, AttemptResult] | [AttemptError, null]`): 一个元组，其中:

- 成功时: `[null, AttemptResult]` - 第一个元素为`null`，第二个为结果
- 出错时: `[AttemptError, null]` - 第一个元素为捕获的错误，第二个为`null`

## 示例

```typescript
import { attempt } from 'es-toolkit/function';

// 成功执行
const [error, result] = attempt(() => 42);
// [null, 42]

// 执行失败
const [error, result] = attempt(() => {
  throw new Error('出现了问题');
});
// [Error, null]

// 使用类型参数
const [error, names] = attempt<string[]>(() => ['Alice', 'Bob']);
// [null, ['Alice', 'Bob']]
```
