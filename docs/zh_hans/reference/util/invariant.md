# invariant

断言给定的条件为真。如果条件为假,则抛出错误。

```typescript
invariant(condition, message);
```

## 用法

### `invariant(condition, message)`

当代码中的特定条件必须满足时,请使用 `invariant`。如果条件为假,它会立即抛出错误以停止程序执行。

```typescript
import { invariant } from 'es-toolkit/util';

// 如果条件为真,则不执行任何操作
invariant(true, '此消息不会出现');

// 如果条件为假,则抛出错误
invariant(false, '此条件为假'); // Error: 此条件为假

// 检查值不为 null 或 undefined 时
const value = getValue();
invariant(value !== null && value !== undefined, '值不能为 null 或 undefined');
// 现在可以确定 value 既不是 null 也不是 undefined

// 检查数字是否为正数时
const number = getNumber();
invariant(number > 0, '数字必须为正数');
```

您也可以直接传递错误对象。

```typescript
import { invariant } from 'es-toolkit/util';

// 传递 Error 对象
invariant(false, new Error('自定义错误消息'));

// 使用自定义错误类
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

invariant(false, new ValidationError('验证失败'));
```

它在开发过程中验证代码假设或确保函数输入值在预期范围内时特别有用。

#### 参数

- `condition` (`unknown`): 要评估的条件。如果评估为假值,则抛出错误。
- `message` (`string | Error`): 当条件为假时要抛出的错误消息或错误对象。

#### 返回值

(`void`): 如果条件为真,则不返回任何内容。

#### 错误

如果条件评估为假,则抛出提供的消息或错误对象。
