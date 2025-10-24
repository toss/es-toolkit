# assert

断言给定的条件为真。如果条件为假,则抛出错误。

```typescript
assert(condition, message);
```

::: info 与 `invariant` 的关系

`assert` 与 `invariant` 函数具有完全相同的功能。唯一的区别是名称。有关更多详细信息,请参阅 [`invariant`](./invariant.md) 文档。

:::

## 参考

### `assert(condition, message)`

当代码中的特定条件必须满足时使用 `assert`。如果条件为假,它会立即抛出错误并停止程序执行。

```typescript
import { assert } from 'es-toolkit/util';

// 如果条件为真,则什么都不做
assert(true, '此消息不会出现');

// 如果条件为假,则抛出错误
assert(false, '此条件为假'); // Error: 此条件为假

// 检查值不是 null 或 undefined 时
const value = getValue();
assert(value !== null && value !== undefined, '值不能是 null 或 undefined');
// 现在可以确定 value 既不是 null 也不是 undefined

// 检查数字是否为正数时
const number = getNumber();
assert(number > 0, '数字必须是正数');
```

你也可以直接传递错误对象。

```typescript
import { assert } from 'es-toolkit/util';

// 传递 Error 对象
assert(false, new Error('自定义错误消息'));

// 使用自定义错误类
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

assert(false, new ValidationError('验证失败'));
```

在开发过程中验证代码假设或检查函数输入是否在预期范围内时特别有用。

#### 参数

- `condition` (`unknown`): 要评估的条件。如果评估为假值,则抛出错误。
- `message` (`string | Error`): 条件为假时要抛出的错误消息或错误对象。

#### 返回值

(`void`): 如果条件为真,则不返回任何内容。

#### 错误

如果条件评估为假,则抛出提供的消息或错误对象。
