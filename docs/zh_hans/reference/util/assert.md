# assert

断言给定条件为真。如果条件为假，则抛出提供的错误信息。

这个函数是 [invariant](./invariant.md) 函数的别名。

## 签名

```typescript
function assert(condition: unknown, message: string): asserts condition;
function assert(condition: unknown, error: Error): asserts condition;
```

### 参数

- `condition` (`unknown`): 要评估的条件。
- `message` (`string` | `Error`): 如果条件为假，则抛出的错误信息。

### 返回值

(`void`): 如果条件为真则返回void。

### 抛出异常

如果条件为假，则抛出带有指定消息的错误。

## 示例

```typescript
// This call will succeed without any errors
assert(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
assert(false, 'This should throw');

// Example of using assert with a condition
assert(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
assert(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using assert to check if a number is positive
assert(number > 0, 'Number must be positive');

// Example of using assert with an error
assert(false, new Error('This should throw'));

// Example of using assert with a custom error
class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}
assert(false, new CustomError('This should throw'));
```
