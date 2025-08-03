# invariant

断言给定条件为真。如果条件为假，则抛出提供的错误信息或错误函数。

## 签名

```typescript
function invariant(condition: unknown, message: string): asserts condition;
function invariant(condition: unknown, error: () => Error): asserts condition;
```

### 参数

- `condition` (`unknown`): 要评估的条件。
- `message` (`string` | `() => Error`): 如果条件为假，则抛出的错误信息或错误函数。

### 返回值

(`void`): 如果条件为真则返回void。

### 抛出异常

如果条件为假，则抛出带有指定消息的错误。

## 示例

```typescript
// 这个调用不会抛出错误
invariant(true, 'This should not throw');

// 这个调用会抛出错误，并抛出带有消息 'This should throw' 的错误
invariant(false, 'This should throw');

// 使用 invariant 检查条件
invariant(condition, 'Expected condition is false');

// 确保值不是 null 或 undefined
invariant(value !== null && value !== undefined, 'Value should not be null or undefined');

// 使用 invariant 检查数字是否为正
invariant(number > 0, 'Number must be positive');

// 使用 invariant 抛出错误函数
invariant(false, () => new Error('This should throw'));

// 使用 invariant 抛出自定义错误函数
class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}
invariant(false, () => new CustomError('This should throw'));
```
