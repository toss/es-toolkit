# rest (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `rest`

此 `rest` 函数由于额外的逻辑(如默认值处理和索引验证)可能会导致性能下降。

请改用更快、更现代的 `es-toolkit` 的 [rest](../../function/rest.md)。

:::

创建一个函数,从指定索引开始将剩余参数分组到数组中。

```typescript
const restFunc = rest(func, start);
```

## 参考

### `rest(func, start)`

当您想通过将指定索引开始的剩余参数分组到数组中来转换函数参数时,请使用 `rest`。它对于创建可变参数函数很有用。

```typescript
import { rest } from 'es-toolkit/compat';

// 基本用法 - 将最后的参数分组到数组中
function logMessage(level, message, ...details) {
  console.log(`[${level}] ${message}`, details);
}

const restLogger = rest(logMessage, 2);
restLogger('ERROR', '发生错误', '详细信息 1', '详细信息 2');
// 内部调用 logMessage('ERROR', '发生错误', ['详细信息 1', '详细信息 2'])

// 不同索引的示例
function process(action, target, ...args) {
  return { action, target, args };
}

const restProcess = rest(process, 1);
restProcess('update', 'user', 'name', 'John', 'age', 25);
// { action: 'update', target: ['user', 'name', 'John', 'age', 25], args: undefined }
```

当您想将函数的最后参数作为数组接收时使用它。在现代 JavaScript 中,使用剩余参数语法(`...args`)更为常见。

#### 参数

- `func` (`Function`): 要转换的函数。
- `start` (`number`, 可选): 开始将参数分组到数组中的索引。默认值为 `func.length - 1`。

#### 返回值

(`Function`): 返回一个新函数,从指定索引开始将剩余参数分组到数组中。
