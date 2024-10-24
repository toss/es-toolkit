# invariant

断言给定条件为真。如果条件为假，则抛出提供的错误信息。

## 签名

```typescript
function invariant(condition: unknown, message: string): asserts condition;
```

### 参数

- `condition` (`unknown`): 要评估的条件。
- `message` (`string`): 如果条件为假，则抛出的错误信息。

### 返回值

(`void`): 如果条件为真则返回void。

### 抛出异常

如果条件为假，则抛出带有指定消息的错误。

## 示例

```typescript
// This call will succeed without any errors
invariant(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
invariant(false, 'This should throw');

// Example of using invariant with a condition
invariant(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
invariant(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using invariant to check if a number is positive
invariant(number > 0, 'Number must be positive');
```
